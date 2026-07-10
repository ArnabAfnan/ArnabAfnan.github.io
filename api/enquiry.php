<?php
/* ================================================================
   enquiry.php — Receives contact form → saves to DB → sends email
   Place in: /retrocanvas/api/enquiry.php
================================================================ */

require_once __DIR__ . '/db.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }
if ($_SERVER['REQUEST_METHOD'] !== 'POST')    { echo json_encode(['status'=>'error','message'=>'POST only']); exit(); }

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!$data) { echo json_encode(['status'=>'error','message'=>'Invalid JSON']); exit(); }

// ── SANITIZE ──────────────────────────────────────────────────
function clean($v) { return htmlspecialchars(strip_tags(trim((string)$v))); }

$name        = clean($data['name']        ?? '');
$partner     = clean($data['partner']     ?? '');
$email       = filter_var(trim($data['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$weddingDate = clean($data['weddingDate'] ?? '');
$venue       = clean($data['venue']       ?? '');
$package     = clean($data['package']     ?? '');
$message     = clean($data['message']     ?? '');

if (!$name || !$email) {
    echo json_encode(['status'=>'error','message'=>'Name and email are required']);
    exit();
}

// ── SAVE TO DATABASE ──────────────────────────────────────────
try {
    $pdo  = getDB();
    $stmt = $pdo->prepare("
        INSERT INTO enquiries (name, partner_name, email, wedding_date, venue, package, message)
        VALUES (:name, :partner, :email, :wedding_date, :venue, :package, :message)
    ");
    $stmt->execute([
        ':name'         => $name,
        ':partner'      => $partner,
        ':email'        => $email,
        ':wedding_date' => $weddingDate ?: null,
        ':venue'        => $venue,
        ':package'      => $package,
        ':message'      => $message,
    ]);
    $enquiryId = $pdo->lastInsertId();
} catch (Exception $e) {
    echo json_encode(['status'=>'error','message'=>'Database error: '.$e->getMessage()]);
    exit();
}

// ── SEND EMAIL ────────────────────────────────────────────────
$to      = 'info@retrocanvasbd.com';
$subject = 'New Enquiry #' . $enquiryId . ' — ' . $name;

$body =
    "============================\n" .
    "  NEW ENQUIRY — RETRO CANVAS\n" .
    "  Enquiry ID: #" . $enquiryId . "\n" .
    "============================\n\n" .
    "Received  : " . date('d M Y, h:i A') . "\n" .
    "Name      : " . $name                . "\n" .
    "Partner   : " . $partner             . "\n" .
    "Email     : " . $email               . "\n" .
    "Wedding   : " . ($weddingDate ?: '—') . "\n" .
    "Venue     : " . ($venue   ?: '—')    . "\n" .
    "Package   : " . ($package ?: '—')    . "\n\n" .
    "Message:\n"   . $message             . "\n\n" .
    "----------------------------\n" .
    "Reply directly to: " . $email . "\n" .
    "Retro Canvas Admin Panel\n";

$headers  = "From: noreply@retrocanvasbd.com\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$mailSent = mail($to, $subject, $body, $headers);

// ── SEND AUTO-REPLY TO CLIENT ─────────────────────────────────
$replySubject = 'We received your enquiry — Retro Canvas';
$replyBody =
    "Dear " . $name . ",\n\n" .
    "Thank you for reaching out to Retro Canvas!\n\n" .
    "We have received your enquiry and will get back to you within 48 hours.\n\n" .
    "Your Enquiry Details:\n" .
    "--------------------\n" .
    "Wedding Date : " . ($weddingDate ?: 'Not specified') . "\n" .
    "Venue        : " . ($venue       ?: 'Not specified') . "\n" .
    "Package      : " . ($package     ?: 'Not specified') . "\n\n" .
    "In the meantime, feel free to browse our portfolio or call us directly:\n" .
    "Phone    : +880 1887-303536\n" .
    "Instagram: @retrocanvas.bd\n" .
    "Facebook : RetroCanvasStudio\n\n" .
    "Warm regards,\n" .
    "Afnan Rahman Arnab\n" .
    "Retro Canvas — Wedding Photography & Cinematography\n" .
    "Dhaka, Bangladesh\n";

$replyHeaders  = "From: info@retrocanvasbd.com\r\n";
$replyHeaders .= "Reply-To: info@retrocanvasbd.com\r\n";
mail($email, $replySubject, $replyBody, $replyHeaders);

// ── RESPOND ───────────────────────────────────────────────────
echo json_encode([
    'status'     => 'ok',
    'enquiry_id' => $enquiryId,
    'mail_sent'  => $mailSent,
]);

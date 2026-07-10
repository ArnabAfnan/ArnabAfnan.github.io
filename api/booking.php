<?php
/* ================================================================
   booking.php — Receives invoice data → saves to DB → sends email
   Place in: /retrocanvas/api/booking.php
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

function clean($v) { return htmlspecialchars(strip_tags(trim((string)$v))); }

// ── SAVE BOOKING TO DATABASE ──────────────────────────────────
try {
    $pdo = getDB();
    $pdo->beginTransaction();

    // Insert main booking record
    $stmt = $pdo->prepare("
        INSERT INTO bookings
            (invoice_no, bk_name, bk_phone, bk_email, bk_relation,
             bride_name, groom_name, bride_phone, groom_phone,
             total_price, disc_percent, disc_amount, net_price,
             advance_paid, balance_due, notes)
        VALUES
            (:invoice_no, :bk_name, :bk_phone, :bk_email, :bk_relation,
             :bride_name, :groom_name, :bride_phone, :groom_phone,
             :total_price, :disc_percent, :disc_amount, :net_price,
             :advance_paid, :balance_due, :notes)
    ");
    $stmt->execute([
        ':invoice_no'   => clean($data['invoiceNo']   ?? ''),
        ':bk_name'      => clean($data['bkName']      ?? ''),
        ':bk_phone'     => clean($data['bkPhone']     ?? ''),
        ':bk_email'     => clean($data['bkEmail']     ?? ''),
        ':bk_relation'  => clean($data['bkRel']       ?? ''),
        ':bride_name'   => clean($data['bride']        ?? ''),
        ':groom_name'   => clean($data['groom']        ?? ''),
        ':bride_phone'  => clean($data['bridePh']      ?? ''),
        ':groom_phone'  => clean($data['groomPh']      ?? ''),
        ':total_price'  => (float)($data['price']       ?? 0),
        ':disc_percent' => (float)($data['discPercent'] ?? 0),
        ':disc_amount'  => (float)($data['discAmount']  ?? 0),
        ':net_price'    => (float)($data['netPrice']    ?? 0),
        ':advance_paid' => (float)($data['advance']     ?? 0),
        ':balance_due'  => (float)($data['balance']     ?? 0),
        ':notes'        => clean($data['notes']         ?? ''),
    ]);

    $bookingId = $pdo->lastInsertId();

    // Insert each event
    $evStmt = $pdo->prepare("
        INSERT INTO booking_events
            (booking_id, event_type, event_date, event_time, venue, package_name, price)
        VALUES
            (:booking_id, :event_type, :event_date, :event_time, :venue, :package_name, :price)
    ");

    $events = $data['events'] ?? [];
    foreach ($events as $ev) {
        $evStmt->execute([
            ':booking_id'   => $bookingId,
            ':event_type'   => clean($ev['type']    ?? ''),
            ':event_date'   => clean($ev['date']    ?? '') ?: null,
            ':event_time'   => clean($ev['time']    ?? '') ?: null,
            ':venue'        => clean($ev['venue']   ?? ''),
            ':package_name' => clean($ev['pkgName'] ?? ''),
            ':price'        => (float)($ev['price'] ?? 0),
        ]);
    }

    $pdo->commit();

} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode(['status'=>'error','message'=>'Database error: '.$e->getMessage()]);
    exit();
}

// ── BUILD EVENT LINES FOR EMAIL ───────────────────────────────
$eventLines = '';
foreach ($events as $i => $ev) {
    $eventLines .=
        "  " . ($i+1) . ". " . clean($ev['type']    ?? '') . "\n" .
        "     Package : "     . clean($ev['pkgName'] ?? '') . "\n" .
        "     Date    : "     . clean($ev['date']    ?? '') . "\n" .
        "     Time    : "     . clean($ev['time']    ?? '') . "\n" .
        "     Venue   : "     . clean($ev['venue']   ?? '') . "\n" .
        "     Price   : BDT " . number_format((float)($ev['price'] ?? 0)) . "\n\n";
}

// ── SEND EMAIL TO STUDIO ──────────────────────────────────────
$to      = 'info@retrocanvasbd.com';
$subject = 'New Booking ' . clean($data['invoiceNo'] ?? '') . ' — '
         . clean($data['bride'] ?? '') . ' & ' . clean($data['groom'] ?? '');

$body =
    "================================\n" .
    "  BOOKING — RETRO CANVAS\n" .
    "  DB Record ID: #" . $bookingId . "\n" .
    "================================\n\n" .
    "Invoice No   : " . clean($data['invoiceNo'] ?? '') . "\n" .
    "Date         : " . date('d M Y, h:i A')            . "\n\n" .
    "--- BOOKED BY ---\n" .
    "Name         : " . clean($data['bkName']  ?? '') . "\n" .
    "Phone        : " . clean($data['bkPhone'] ?? '') . "\n" .
    "Email        : " . clean($data['bkEmail'] ?? '') . "\n" .
    "Relation     : " . clean($data['bkRel']   ?? '') . "\n\n" .
    "--- COUPLE ---\n" .
    "Bride        : " . clean($data['bride']   ?? '') . "\n" .
    "Groom        : " . clean($data['groom']   ?? '') . "\n" .
    "Bride Phone  : " . clean($data['bridePh'] ?? '') . "\n" .
    "Groom Phone  : " . clean($data['groomPh'] ?? '') . "\n\n" .
    "--- EVENTS ---\n" . $eventLines .
    "--- PAYMENT ---\n" .
    "Total Price  : BDT " . number_format((float)($data['price']       ?? 0)) . "\n" .
    "Discount     : "     . clean($data['discPercent'] ?? '0') . "% — BDT " . number_format((float)($data['discAmount'] ?? 0)) . "\n" .
    "Net Total    : BDT " . number_format((float)($data['netPrice']    ?? 0)) . "\n" .
    "Advance Paid : BDT " . number_format((float)($data['advance']     ?? 0)) . "\n" .
    "Balance Due  : BDT " . number_format((float)($data['balance']     ?? 0)) . "\n\n" .
    "--- NOTES ---\n" . clean($data['notes'] ?? '') . "\n\n" .
    "View all bookings in your admin panel.\n" .
    "Retro Canvas — info@retrocanvasbd.com\n";

$headers  = "From: noreply@retrocanvasbd.com\r\n";
$headers .= "Reply-To: " . clean($data['bkEmail'] ?? 'info@retrocanvasbd.com') . "\r\n";
$mailSent = mail($to, $subject, $body, $headers);

// ── RESPOND ───────────────────────────────────────────────────
echo json_encode([
    'status'     => 'ok',
    'booking_id' => $bookingId,
    'invoice_no' => clean($data['invoiceNo'] ?? ''),
    'mail_sent'  => $mailSent,
]);

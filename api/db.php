<?php
/* ================================================================
   db.php — Database connection
   Place in: /retrocanvas/api/db.php
   
   CREATE DATABASE in cPanel → MySQL Databases:
   Database name: retrocanvas_db
   Username:      retrocanvas_user
   Password:      (set your own strong password)
================================================================ */

define('DB_HOST', 'localhost');
define('DB_NAME', 'retrocan_retrocanvas_db');
define('DB_USER', 'retrocan_retrocanvas_user');
define('DB_PASS', 'Retro@2024');  // ← change this

function getDB() {
    static $pdo = null;
    if ($pdo === null) {
        try {
            $pdo = new PDO(
                'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
                DB_USER,
                DB_PASS,
                [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES   => false,
                ]
            );
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Database connection failed']);
            exit();
        }
    }
    return $pdo;
}

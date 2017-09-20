<?php

require_once(__DIR__ . '/../../vendor/autoload.php');
require_once(__DIR__ . '/GenerateMockRows.php');

$dotenv = new Dotenv\Dotenv(__DIR__ . '/../../');
$dotenv->load();

class TestDatabase {

    private $DBH;
    private $GenerateRows;

    public function __construct() {

        $this->GenerateRows = new GenerateMockRows();
    }

    private function connect() {

        $this->DBH = new PDO("mysql:host=" . $_ENV['DB_HOST'], $_ENV['DB_USER'], $_ENV['DB_PASS']);

        $this->DBH->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    private function create() {

        $schema = file_get_contents(__DIR__ . '/../../../schema.sql');

        $this->DBH->query("CREATE DATABASE IF NOT EXISTS {$_ENV['DB_NAME']}");
        $this->DBH->query("USE {$_ENV['DB_NAME']}");
        $this->DBH->query($schema);
    }

    private function insertMockData() {

        $this->GenerateRows->all();

        $tables = [
            'users' => $this->GenerateRows->users,
            'issues' => $this->GenerateRows->issues,
            'pageinfo' => $this->GenerateRows->pageinfo,
            'tag_list' => $this->GenerateRows->tag_list,
            'tags' => $this->GenerateRows->tags,
            'comments' => $this->GenerateRows->comments,
            'images' => $this->GenerateRows->images
        ];

        foreach ($tables as $tableName => $table) {


            $fields = implode(',', array_keys($table[0]));

            $valuesArr = array_reduce($table, function ($accum, $row) {
                return array_merge($accum, array_values($row));
            }, []);

            $placeholdersArr = array_reduce($table, function ($accum, $row) {

                return array_merge($accum, [implode(',', array_fill(0, count($row), '?'))]);
            }, []);

            $placeholders = implode('),(', $placeholdersArr);

            Db::Query("INSERT INTO {$tableName} ({$fields}) VALUES ({$placeholders})", $valuesArr);

        }
    }

    private function drop() {
        $this->DBH->query("DROP DATABASE {$_ENV['DB_NAME']}");
    }

    public function init() {

        $this->connect();

        try {
            $this->drop(); // in case db already exists
        } catch(PDOException $e) { /* do nothing since db *shouldn't* exist */ }

        $this->create();
        $this->insertMockData();
    }
}

$db = new TestDatabase();
$db->init();

?>
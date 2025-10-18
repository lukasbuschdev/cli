#!/usr/bin/env python3
import os, sys, time, json
from cs50 import SQL
import sqlite3

"""
history.py
This script is part of the CS50 final project feature.
It stores and retrieves command history using SQLite via the CS50 `SQL` library.
"""

# database path
DB_PATH = os.path.join(os.path.dirname(__file__), "history.db")
DB_URI = f"sqlite:///{DB_PATH}"

# initialize database
def init_db():
    connection = sqlite3.connect(DB_PATH)
    cursor = connection.cursor()
    cursor.execute("PRAGMA journal_mode=WAL;")
    cursor.execute("CREATE TABLE IF NOT EXISTS history (id INTEGER PRIMARY KEY AUTOINCREMENT, command TEXT NOT NULL, created_at INTEGER NOT NULL);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_created_at ON history(created_at);")
    connection.commit()
    connection.close()

# insert command into DB
def insert_cmd(db, cmd: str):
    cmd = (cmd or "").strip()
    if not cmd:
        print(json.dumps({"ok": False, "error": "empty command"}))
        return 1
    db.execute("INSERT INTO history (command, created_at) VALUES (?, ?)", cmd, int(time.time()))
    print(json.dumps({"ok": True}))
    return 0

# fetch command history
def list_cmds(db, limit: int):
    limit = max(1, min(int(limit), 10000))
    try:
        if limit < 10000:
            rows = db.execute("SELECT command, created_at FROM (SELECT command, created_at FROM history ORDER BY created_at DESC LIMIT ?) sub ORDER BY created_at ASC", limit)
        else:
            rows = db.execute("SELECT command, created_at FROM history ORDER BY created_at ASC")
        print(json.dumps({"rows": rows}))
        return 0
    except Exception as e:
        print(json.dumps({"ok": False, "error": str(e)}))
        return 1

# entry point
def main():
    init_db()
    db = SQL(DB_URI)

    if len(sys.argv) < 2:
        print(json.dumps({"ok": False, "error": "missing subcommand"}))
        return 1

    action = sys.argv[1]

    if action == "insert":
        if "--cmd" in sys.argv:
            cmd_index = sys.argv.index("--cmd") + 1
            if cmd_index < len(sys.argv):
                return insert_cmd(db, sys.argv[cmd_index])
        print(json.dumps({"ok": False, "error": "missing --cmd"}))
        return 1

    elif action == "list":
        limit = 10000
        if "--limit" in sys.argv:
            try:
                limit = int(sys.argv[sys.argv.index("--limit") + 1])
            except:
                pass
        return list_cmds(db, limit)

    else:
        print(json.dumps({"ok": False, "error": "unknown subcommand"}))
        return 1

if __name__ == "__main__":
    sys.exit(main())

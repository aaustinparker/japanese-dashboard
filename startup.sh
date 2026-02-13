#!/bin/bash

# Start LibreTranslate in the background
echo "Starting LibreTranslate server..."
libretranslate --host 0.0.0.0 --port 5000 --load-only en,ja &

LIBRETRANSLATE_PID=$!
shutdown() {
    echo "Shutting down services..."
    kill $LIBRETRANSLATE_PID
    exit 0
}
trap shutdown SIGTERM SIGINT

sleep 2

# Start Node.js server in the foreground
echo "Starting Node.js server..."
exec npm start

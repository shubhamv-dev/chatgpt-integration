APP_NAME="ask-anything-next"
APP_PATH="/home/webntf/public_html/ask-anything-next"
NEXT_PORT="8002"

# Check if the app is already running
if pm2 show $APP_NAME > /dev/null; then
  # App is running, restart it
  echo "Restarting $APP_NAME..."
  pm2 stop $APP_NAME
  pm2 start $APP_NAME
else
  # App is not running, start it
  echo "Starting $APP_NAME..."
  cd $APP_PATH
  pm2 start npm --name $APP_NAME -- run dev -- --port $NEXT_PORT  
fi

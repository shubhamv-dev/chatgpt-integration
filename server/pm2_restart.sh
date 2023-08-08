APP_NAME="ask-anything"
APP_PATH="/home/webntf/NodeJsApps/ask-anything"

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
  pm2 start app.js --name $APP_NAME
fi

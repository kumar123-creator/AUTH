let sessionTimer;

export function startSessionTimeout(timeoutMinutes, onTimeout) {
  clearTimeout(sessionTimer);

  // Calculate session timeout in milliseconds
  const timeoutMilliseconds = timeoutMinutes * 60 * 1000;

  // Set the session timeout
  sessionTimer = setTimeout(() => {
    endSession();
    onTimeout();
  }, timeoutMilliseconds);
}

export function endSession() {
  clearTimeout(sessionTimer);
  sessionStorage.clear(); // Clear session data
}

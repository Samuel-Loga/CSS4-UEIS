from pyfirmata import Arduino
from time import sleep
import psycopg2
import hashlib

# Set up the Arduino board
board = pyfirmata.Arduino('COM3')  # Replace with the appropriate port

# Set up the database connection
conn = psycopg2.connect(
    host="your_host",
    database="your_database",
    user="your_user",
    password="your_password"
)
cursor = conn.cursor()

# Create a table to store biometric data if it doesn't exist
cursor.execute('''
    CREATE TABLE IF NOT EXISTS biometrics (
        id SERIAL PRIMARY KEY,
        fingerprint TEXT
    )
''')
conn.commit()

# Main loop to collect and store biometric data
try:
    while True:
        # Read fingerprint data from Arduino (replace this with actual fingerprint sensor code)
        fingerprint_data = "dummy_fingerprint_data"

        # Validate fingerprint data (replace this with your validation logic)
        if len(fingerprint_data) < 10:
            print("Invalid fingerprint data")
            continue

        # Encrypt the fingerprint data using SHA-256
        encrypted_fingerprint = hashlib.sha256(fingerprint_data.encode()).hexdigest()

        # Insert the encrypted data into the database
        cursor.execute('INSERT INTO biometrics (fingerprint) VALUES (%s)', (encrypted_fingerprint,))
        conn.commit()

        print("Biometric data stored")

except KeyboardInterrupt:
    print("Process interrupted by user")

except Exception as e:
    print("An error occurred:", str(e))

finally:
    # Close the connections
    cursor.close()
    conn.close()
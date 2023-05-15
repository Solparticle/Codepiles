import mysql.connector

from mysql.connector import Error

from flask import Flask, request

app = Flask(__name__)

# MySQL connection configuration

config = {

    'user': 'your_username',

    'password': 'your_password',

    'host': 'your_host',

    'database': 'your_database',

    'raise_on_warnings': True

}

def query_database(value):

    try:

        # Connect to MySQL server

        connection = mysql.connector.connect(**config)

        # Create a cursor object to execute queries

        cursor = connection.cursor()

        # Prepare the SQL query

        query = "SELECT * FROM your_table WHERE column_name = %s"

        # Execute the query with the input value

        cursor.execute(query, (value,))

        # Fetch the result

        result = cursor.fetchone()

        # Close the cursor and connection

        cursor.close()

        connection.close()

        return result

    except Error as e:

        print("Error connecting to MySQL:", e)

        return None

@app.route('/', methods=['GET', 'POST'])

def index():

    if request.method == 'POST':

        # Get the value from the HTML form

        input_value = request.form['input_value']

        # Query the database with the input value

        result = query_database(input_value)

        if result:

            # Display the matching result

            return "Result: {}".format(result)

        else:

            return "No matching result found."

    # Display the HTML form

    return '''

        <form method="post">

            <input type="text" name="input_value" placeholder="Enter a value">

            <input type="submit" value="Submit">

        </form>

    '''

if __name__ == '__main__':

    app.run()

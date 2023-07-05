
def divide_numbers(a, b):
    try:
        # Add a logging statement here to log the division operation
        result = a / b
        # Add a logging statement here to log the result of the division
        return result
    except ZeroDivisionError as e:
        # Add a logging statement here to log the "Cannot divide by zero" error
        raise e
    except Exception as e:
        # Add a logging statement here to log any other errors that occur
        raise e

def perform_task(a, b):
    try:
        # Add a logging statement here to log the start of the task
        result = divide_numbers(a, b)
        
        # Add a logging statement here to log the successful completion of the task
    except Exception as e:
        # Add a logging statement here to log the task failure
        # Handle the exception or take appropriate actions
        pass



# Example usage
perform_task(10, 5)

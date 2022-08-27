from typing import Tuple


def sleep_time(age: int) -> Tuple[int, int]:
    # https://www.cdc.gov/sleep/about_sleep/how_much_sleep.html
    if age < 1:
        return 12, 16
    elif age < 2:
        return 11, 14
    elif age < 5:
        return 10, 13
    elif age < 12:
        return 9, 12
    elif age < 18:
        return 9, 10
    elif age < 64:
        return 7, 9
    return 7, 8

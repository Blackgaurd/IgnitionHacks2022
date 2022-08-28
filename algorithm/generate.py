# generate random data for testing

import math
import random
from typing import List, Tuple
import json


from constants import sleep_time


def generate_data(age: int, cycle_mins: int, noise: float, num_samples: int) -> List[Tuple[int, int]]:
    min_sleep, max_sleep = sleep_time(age)
    min_sleep *= 60
    max_sleep *= 60

    samples = []
    func = lambda x: round(5 * math.cos(2 * math.pi / cycle_mins * x) + 5)
    for i in range(num_samples):
        # x = sleep minutes
        # y = sleep comfort rating/level (1-10)
        x = random.randint(min_sleep, max_sleep)
        y = func(x)
        x += random.normalvariate(0, noise)
        x = round(x)
        samples.append((x, y))

    return samples

samples = generate_data(age=14, cycle_mins=110, noise=0.2, num_samples=1000)
with open("data.txt", "w") as f:
    for x, y in samples:
        f.write(f"{x} {y}\n")

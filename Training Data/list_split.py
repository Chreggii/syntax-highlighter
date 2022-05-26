import math
import random


def random_list_split(list, splitpoint):
    random.shuffle(list)
    elements_in_main_list = round(len(list)*splitpoint)
    main_list = list[:elements_in_main_list]
    other_list = [x for x in list if x not in main_list]
    return main_list, other_list
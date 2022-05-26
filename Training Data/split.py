"""
This file splits the files in the folder input_data into training and test data.
"""
import os
import shutil
from list_split import random_list_split

INPUT_DATA_FOLDER = "input_data"
OUTPUT_TRAINING_DATA_FOLDER = "train_data"
OUTPUT_TESTING_DATA_FOLDER = "test_data"

PYTHON_FOLDER = "python"
JAVA_FOLDER = "java"
KOTLIN_FOLDER = "kotlin"

subfolders = [PYTHON_FOLDER, JAVA_FOLDER, KOTLIN_FOLDER]

for folder in (OUTPUT_TRAINING_DATA_FOLDER, OUTPUT_TESTING_DATA_FOLDER):
    shutil.rmtree(folder, ignore_errors=True)
    os.mkdir(folder)
    for subfolder in subfolders:
        os.mkdir(os.path.join(folder, subfolder))

for subfolder in subfolders:
    current_folder = os.path.join(INPUT_DATA_FOLDER, subfolder)
    files_in_folder = os.listdir(current_folder)
    train_data_files, test_data_files = random_list_split(files_in_folder, 0.8)
    print(f"{subfolder}: {len(train_data_files)} train files, {len(test_data_files)} test files")
    for file in train_data_files:
        source_path = os.path.join(INPUT_DATA_FOLDER, subfolder, file)
        target_path = os.path.join(OUTPUT_TRAINING_DATA_FOLDER, subfolder, file)
        shutil.copyfile(source_path, target_path)
    for file in test_data_files:
        source_path = os.path.join(INPUT_DATA_FOLDER, subfolder, file)
        target_path = os.path.join(OUTPUT_TESTING_DATA_FOLDER, subfolder, file)
        shutil.copyfile(source_path, target_path)

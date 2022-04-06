# ASE: Annotation Base Learner

## Requirements
Recommended Python version:
```txt
Python 3.9.7
```

Dependencies:
```txt
certifi==2021.10.8
numpy==1.22.1
Pillow==9.0.0
pip==21.2.4
setuptools==58.0.4
torch==1.10.1
torchaudio==0.10.1
torchvision==0.11.2
typing_extensions==4.0.1
wheel==0.37.1
```

## Overview

### Creation
All the required interactions are carried out through `SHModel` objects.
These can be initialised by providing the target language name, as per the 3 constants
`JAVA_LANG_NAME`, `KOTLIN_LANG_NAME`, `PYTHON3_LANG_NAME`; and an alphanumeric
model name of your choice. For example:
```python
pythonModel = SHModel(PYTHON3_LANG_NAME, "HelloWorld")
```
creates a python model named HelloWorld.

### Persisting and Loading
A model can be saved to disk, in the current directory by means of the `persist_model` method.
Hence running
```python
pythonModel.persist_model()
```
will save the python model to the relative file `./python3_HelloWorld.pt`.

Note that if the file `./python3_HelloWorld.pt` already exists, this is overwritten when calling `persist_model` function.
Whereas, if the file already exists upon initialising the model (invoking the constructor with the same language
name and model name), this model is loaded from disk.

### Fine-tuning
At any time, the model can be set to its fine-tuning mode.
This can be done by invoking the `setup_for_finetuning` method, and only needs to be done once.

After setting up the model for fine-tuning, this can be fine-tuned by invoking one or more times
the `finetune_on` method. This accepts the non-empty sequences of token ids and respective
highlighting codes, as they are naturally computed by the accompanied java annotation library.
These two parameters must (of course) be of the same length, and contain values in range of the language
being analysed: the output of the java library already satisfies these two requirements.
For example the following fine-tunes the model (on two fictitious samples):
```python
pythonModel.setup_for_finetuning()
pythonModel.finetune_on([1, 25, 30, 44, 55], [0, 0, 4, 0, 3])
pythonModel.finetune_on([55, 44, 30, 25], [0, 0, 4, 8])
...
```
The fine-tuning process only makes a small improvement for each `finetune_on` call: you
may need to repeat the process multiple times on the same set of samples, before seeing some increases in accuracy.
`finetune_on` returns a `float` value representing the `loss` observed during the fine-tuning step.
You can interpret this value as the absolute `distance` of the model's prediction on the given input vector, from the target vector.
In theory, a zero loss means the model made a perfect prediction during the fine-tuning step: the model had no reason to
'improve' on that run.
In practice, you'll converge towards near-zero values for each sample: you may choose to halt the fine-tuning on your samples
when you observe convergence, and restart whenever you have new samples; although other strategies are available.
-- A non-zero loss does not entail the model made an incorrect prediction
The model produces a categorical probability distribution of Annotation types (11) for each token,
which might lead to the correct prediction once the maximum are taken. 

Note that like for most machine learning models, the model is likely to perform considerably
better on samples (files) it's been fine-tuned on. Hence, you might want to prevent the model to
fine-tune on a number of samples, for you to safely validate the evolution of its accuracy.
Samples equivalence is based on the exact ordered equivalence of token id sequences.


### Predicting
Disclaimer: when a model is first initialised (that is not loaded from disk), its prediction performances
will be poor, as these are random; hence a fine-tuning of the model should occur before utilising it
for prediction.

At any time, the model can be set to its prediction mode.
This can be done by invoking the `setup_for_prediction` method, and only needs to be done once.
After setting up the model for prediction, this can be used to predict syntax highlighting code
sequences for any valid input sequence of token ids, as computed by the lexing functionality of the
java library it accompanies. For example:
```python
pythonModel.setup_for_prediction()
pythonModel.predict([1, 25, 30, 44, 55])
pythonModel.predict([55, 44, 30, 25])
...
```

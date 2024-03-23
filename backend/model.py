import torch
import torch.nn as nn
from torch.utils.data import DataLoader
import torchvision.datasets as datasets
import torchvision.transforms as transforms 
import matplotlib.pyplot as plt


class Net(nn.Module, hidden, hidden_size, input_size = 784, output_size = 2):
    def __init__(self):
        super().__init__()
        self.layers = [nn.Linear(input_size, hidden_size)]
        for _ in range(hidden - 1):
            self.layers += [nn.Linear(hidden_size, hidden_size)]
        self.layers.append(nn.Linear(hidden_size, output_size))
        self.model = nn.Sequential(*layers)
    
    def forward(self, x):
        output = self.model(x)
        return output


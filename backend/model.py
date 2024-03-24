import torch
import torch.nn as nn
from torch.utils.data import DataLoader
import torchvision.datasets as datasets
import torchvision.transforms as transforms 
import matplotlib.pyplot as plt


class Net(nn.Module):
    def __init__(self, hidden, hidden_size, input_size = 784, output_size = 10):
        super().__init__()
        self.layers = [nn.Linear(input_size, hidden_size)]
        for _ in range(hidden - 1):
            self.layers += [nn.Linear(hidden_size, hidden_size)]
        self.layers.append(nn.Linear(hidden_size, output_size))
        self.model = nn.Sequential(*self.layers)
    
    def forward(self, x):
        output = self.model(x)
        return output

def train(model, optimizer, criterion, batch_size, train_loader, val_loader, epochs):
    model.train()
    Loss = []
    Acc = []
    for epoch in range(epochs):
        for idx, (images, labels) in enumerate(train_loader):
            optimizer.zero_grad()
            outputs = model(images.view(-1, 28*28))
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
        Loss.append(loss.item())
        correct = 0
        total = 0
        for images, labels in val_loader:
                outputs = model(images.view(-1, 28*28))
                _, predicted = torch.max(outputs.data, 1)
                correct += (predicted == labels).sum()
                total += batch_size
        accuracy = 100*(correct.item()) / (total)
        Acc.append(accuracy)
        Acc.append(accuracy)
        if epoch % 10 == 0:
                print('Epoch: {}. Loss: {}. Accuracy: {}'.format(epoch, loss.item(), accuracy))
    return Loss, Acc
        

if __name__ == "__main__":
    model = Net(1,10)
    train_data = datasets.MNIST('./data', train=True, download=False, transform=transforms.ToTensor())
    train_data = list(train_data)[:4000]
    train_data, val_data = train_data[:3500], train_data[3500:]

    optimizer = torch.optim.SGD(model.parameters(), lr = 0.001)
    criterion = torch.nn.CrossEntropyLoss()
    batch_size = 16
    epochs = 50
    train_loader = DataLoader(dataset = train_data, batch_size = batch_size, shuffle = True)
    val_loader = DataLoader(dataset = val_data, batch_size = batch_size, shuffle = True)

    train(model, optimizer, criterion, batch_size, train_loader, val_loader, epochs)

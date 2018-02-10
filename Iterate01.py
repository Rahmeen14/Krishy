# -*- coding: utf-8 -*-
"""
Created on Sat Feb 10 17:19:32 2018

@author: Shreya
"""

import pandas as pd
import csv
import numpy as np

climateData = pd.read_csv(r'C:\Users\Shreya\Desktop\Climate Data.csv')

#### CROPMAP ###########

y = np.zeros((1332,6),np.int64)
cropMap = {'wheat':0, 'maize':1, 'rice':2, 'pulse':3, 'sugarcane':4, 'jute':5}

#%%

#### Y INSERTION #######

i =0
for index, row in climateData.iterrows():    
    if (not(row[5]<10 and row[4]<10) and not(row[5]>15 and row[4]>15) and (row[6]>=50 and row[6]<=100) and (row[7] in [1,7,8,10])):
        y[i,cropMap['wheat']] = 1
        
    if (not(row[5]<21 and row[4]<21) and not(row[5]>27 and row[4]>27) and (row[6]>=50 and row[6]<=100) and (row[7] in [1,9,4,10])):
        y[i,cropMap['maize']] = 1
    
    if (not(row[5]<16 and row[4]<16) and not(row[5]>27 and row[4]>27) and (row[6]>=100 and row[6]<=200) and (row[7] in [1,10,7,8])):
        y[i,cropMap['rice']] = 1
    
    if (not(row[5]<20 and row[4]<20) and not(row[5]>30 and row[4]>30) and (row[6]>=50 and row[6]<=80) and (row[7] in [1,5,7,8])):
        y[i,cropMap['pulse']] = 1
    
    if (not(row[5]<27 and row[4]<27) and not(row[5]>30 and row[4]>30) and (row[6]>=100 and row[6]<=175) and (row[7] in [1,10,7,8,0])):
        y[i,cropMap['sugarcane']] = 1
    
    if (not(row[5]<24 and row[4]<24) and not(row[5]>37 and row[4]>37) and (row[6]>=150 and row[6]<=1000) and (row[7] in [1,10,7,8])):
        y[i,cropMap['jute']] = 1
    i = i+1
    

with open("Climate.csv", "w") as csvfile:
    writer = csv.writer(csvfile, delimiter=",")
    writer.writerow(["Station Name","Month","Period","No. of Years","Mean Temp Max","Mean Temp Min","Mean Rainfall","Soil Type", "Wheat","Maize", "Rice", "Pulse", "Sugarcane", "Jute"])
    i =0
    for index, row in climateData.iterrows():
        writer.writerow([row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], y[i,0], y[i,1], y[i,2], y[i,3], y[i,4], y[i,5]])
        i = i+1
        
        
# -*- coding: utf-8 -*-
"""
Created on Sat Feb 10 15:23:44 2018
@author: Sarthak
"""
import sys
import pandas as pd
locationData = pd.read_csv(sys.argv[1])

lat = (float(sys.argv[2]))
lng = (float(sys.argv[3]))
def KNN(lat, lon):
    
    minDistPlace = 'Not Found'
    minVal = 100000

    for index, row in locationData.iterrows():
        val = (lat-row[1])**2 + (lon-row[2])**2
        if (val<minVal):
            minDistPlace = row[0]
            minVal = val
    return minDistPlace
place=KNN(lat,lng)
print(place)
#%%


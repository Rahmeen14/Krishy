# -*- coding: utf-8 -*-
"""
Created on Sat Feb 10 15:23:44 2018
@author: Sarthak
"""
import sys
import pandas as pd
locationData = pd.read_csv(sys.argv[1])

lat = (float(sys.argv[3]))
lng = (float(sys.argv[4]))
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

lookup =pd.read_csv(sys.argv[2])

#placeName = (sys.argv[2])
month = (sys.argv[5])

def look(place, month):
    for index, row in lookup.iterrows():
        if row[0] == place and row[1] == month:
            return(row[4:8])
            
a,b,c,d= look(place,month)
print(a,b,c,d)
#%%


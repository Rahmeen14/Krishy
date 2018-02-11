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
crop = (sys.argv[6])
def look(place, month):
    for index, row in lookup.iterrows():
        if row[0] == place and row[1] == month:
            return(row[4:8])
            
a,b,c,d= look(place,month)

if(crop=="wheat"):
    if (not(b<10 and a<10) and not(b>15 and a>15) and (c>=50 and c<=100) and (d in [1,7,8,10])):
        print(1)
    else:
        print(0)
elif(crop=="maize"):       
    if (not(b<21 and a<21) and not(b>27 and a>27) and (c>=50 and c<=100) and (d in [1,9,4,10])):
        print(1)
    else:
        print(0)
elif(crop=="rice"):      
    if (not(b<16 and a<16) and not(b>27 and a>27) and (c>=100 and c<=200) and (d in [1,10,7,8])):
        print(1)
    else:
        print(0)
elif(crop=="pulse"):        
    if (not(b<20 and a<20) and not(b>30 and a>30) and (c>=50 and c<=80) and (d in [1,5,7,8])):
        print(1)
    else:
        print(0)
elif(crop=="sugarcane"):        
    if (not(b<27 and a<27) and not(b>30 and a>30) and (c>=100 and c<=175) and (d in [1,10,7,8,0])):
        print(1)
    else:
        print(0)
elif(crop=="jute"):       
    if (not(b<24 and a<24) and not(b>37 and a>37) and (c>=150 and c<=1000) and (d in [1,10,7,8])):
        print(1)
    else:
        print(0)

#%%


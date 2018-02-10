# -*- coding: utf-8 -*-
"""
Created on Sat Feb 10 19:44:22 2018

@author: Shreya
"""
import sys
import pandas as pd
lookup =pd.read_csv(sys.argv[1])

placeName = (sys.argv[2])
month = (sys.argv[3])

def look(placeName, month):
    for index, row in lookup.iterrows():
        if row[0] == placeName and row[1] == month:
            return(row[4])
            
a= look(placeName,month)
print(a)
#%%

            

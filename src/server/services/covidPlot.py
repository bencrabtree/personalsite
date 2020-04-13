import sys
import pandas as pd
import numpy as np
pd.set_option('display.max_rows', None)
pd.set_option('display.max_columns', None)
pd.set_option('display.width', None)
pd.set_option('display.max_colwidth', -1)

def main():
    confirmed = pd.read_csv('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv')
    recovered = pd.read_csv('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv')
    deaths = pd.read_csv('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv')

    dataframes = [
        { "df": confirmed, "valueName": "Confirmed", "range": 20000 },
        { "df": recovered, "valueName": "Recovered", "range": 10000 },
        { "df": deaths, "valueName": "Deaths", "range": 2000 }
    ]

    for x in dataframes:
        x['df'] = pd.melt(x['df'], id_vars=['Province/State', 'Country/Region', 'Long', 'Lat'], var_name='Date', value_name=x['valueName']).fillna('').drop(['Long', 'Lat'], axis=1)
        x['df']['Location'] = x['df']['Country/Region'] + ' ' + x['df']['Province/State']
        x['df'] = x['df'].drop(['Country/Region', 'Province/State'], axis=1)

    for x in dataframes:
        byCountry = pd.DataFrame(x['df'].groupby('Location')[x['valueName']].apply(list)).reset_index()
        newDict = {}
        for i in range(len(byCountry['Location'])):
            newDict[byCountry['Location'][i]] = byCountry[x['valueName']][i]

        df = pd.DataFrame(newDict, index=x['df']['Date'].unique())
        df.drop([col for col, val in df.items() if (val.max() - val.min() < x['range'])], axis=1, inplace=True)

        result = []
        for (index, row) in df.iterrows():
            temp = {}
            for y in range(len(row.values)):
                temp[row.index.tolist()[y].strip()] = row.values[y]

            temp.update({ 'name': index })
            result.append(temp)

        x['df'] = result

    print(dataframes)

    sys.stdout.flush()

if __name__ == '__main__':
    main()

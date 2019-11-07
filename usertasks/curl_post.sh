#!/bin/bash
URL="http://127.0.0.1:8000/demo2/insert";
reqd=`date "+%Y/%m/%d %T"`;
echo $URL;
echo $reqd;
declare -a arr=("1281b6" "12cee7" "12cee6" "12cee4" "12cee3" "12ce3e" "12ce99" "12ceb2" "12cead" "12cee5");

for i in {1..5}
do
  num=$(($RANDOM % 10));
  tag=`cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 16 | head -n 1`;
  eval reader='${arr['$num']}';
  echo $reader;
  curl -X POST "$URL" -d "set_time=$reqd&epc=E2801175&tag=$tag&reader=$reader"
done


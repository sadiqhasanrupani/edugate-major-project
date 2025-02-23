#!/bin/bash

# curl -X POST "http://localhost:8080/auth/signup" \
#      -H "Content-Type: application/json" \
#      -d '{
#        "userName": "Sadiqhasan Rupani",
#        "userEmail": "sadiqhasanrupani11@gmail.com",
#        "userPhoneNumber": "7498412427",
#        "userDOB": "2003-01-09",
#        "userPassword": "sadiq123",
#        "userConfirmPassword": "sadiq123"
#      }'

curl -X POST "http:/edugate.sadiqr.in/edugate-server/auth/signup" \
     -H "Content-Type: application/json" \
     -d '{
       "userName": "Sadiqhasan Rupani",
       "userEmail": "sadiqhasanrupani11@gmail.com",
       "userPhoneNumber": "7498412427",
       "userDOB": "2003-01-09",
       "userPassword": "sadiq123",
       "userConfirmPassword": "sadiq123"
     }'

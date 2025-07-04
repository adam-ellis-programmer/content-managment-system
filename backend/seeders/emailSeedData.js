const mongoose = require('mongoose')

const emailSignupData = [
  {
    name: 'Sarah Smith',
    email: 'sarah@email.com',
    terms: true,
    date: 'Fri 24 May 2025',
    time: '16:54:54',
  },
  {
    name: 'footer signup',
    email: 'john.doe@gmail.com',
    terms: true,
    date: 'Sat 25 May 2025',
    time: '09:32:17',
  },
  {
    name: 'Emily Johnson',
    email: 'emily.johnson@yahoo.com',
    terms: true,
    date: 'Sun 26 May 2025',
    time: '14:22:08',
  },
  {
    name: 'footer signup',
    email: 'mike.brown@outlook.com',
    terms: true,
    date: 'Mon 27 May 2025',
    time: '11:45:33',
  },
  {
    name: 'Lisa Wilson',
    email: 'lisa.wilson@hotmail.com',
    terms: true,
    date: 'Tue 28 May 2025',
    time: '18:12:45',
  },
  {
    name: 'David Martinez',
    email: 'david.martinez@icloud.com',
    terms: true,
    date: 'Wed 29 May 2025',
    time: '07:58:21',
  },
  {
    name: 'footer signup',
    email: 'anna.garcia@protonmail.com',
    terms: true,
    date: 'Thu 30 May 2025',
    time: '20:36:14',
  },
  {
    name: 'Robert Taylor',
    email: 'robert.taylor@gmail.com',
    terms: true,
    date: 'Fri 31 May 2025',
    time: '13:27:52',
  },
  {
    name: 'footer signup',
    email: 'jessica.lee@yahoo.com',
    terms: true,
    date: 'Sat 01 Jun 2025',
    time: '16:19:07',
  },
  {
    name: 'Christopher Davis',
    email: 'chris.davis@outlook.com',
    terms: true,
    date: 'Sun 02 Jun 2025',
    time: '10:43:29',
  },
  {
    name: 'Amanda Rodriguez',
    email: 'amanda.rodriguez@gmail.com',
    terms: true,
    date: 'Mon 03 Jun 2025',
    time: '15:56:18',
  },
  {
    name: 'footer signup',
    email: 'kevin.thompson@hotmail.com',
    terms: true,
    date: 'Tue 04 Jun 2025',
    time: '08:14:36',
  },
  {
    name: 'Michelle Anderson',
    email: 'michelle.anderson@icloud.com',
    terms: true,
    date: 'Wed 05 Jun 2025',
    time: '19:28:41',
  },
  {
    name: 'footer signup',
    email: 'daniel.white@protonmail.com',
    terms: true,
    date: 'Thu 06 Jun 2025',
    time: '12:07:53',
  },
  {
    name: 'Rachel Green',
    email: 'rachel.green@gmail.com',
    terms: true,
    date: 'Fri 07 Jun 2025',
    time: '17:41:22',
  },
  {
    name: 'footer signup',
    email: 'steven.harris@yahoo.com',
    terms: true,
    date: 'Sat 08 Jun 2025',
    time: '09:53:15',
  },
  {
    name: 'Nicole Clark',
    email: 'nicole.clark@outlook.com',
    terms: true,
    date: 'Sun 09 Jun 2025',
    time: '14:35:48',
  },
  {
    name: 'footer signup',
    email: 'brian.lewis@hotmail.com',
    terms: true,
    date: 'Mon 10 Jun 2025',
    time: '11:26:04',
  },
  {
    name: 'Stephanie Walker',
    email: 'stephanie.walker@icloud.com',
    terms: true,
    date: 'Tue 11 Jun 2025',
    time: '16:18:37',
  },
  {
    name: 'footer signup',
    email: 'gregory.hall@gmail.com',
    terms: true,
    date: 'Wed 12 Jun 2025',
    time: '13:52:26',
  },
]

module.exports = { emailSignupData }

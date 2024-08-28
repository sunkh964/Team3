import { tr } from 'date-fns/locale';
import moment from 'moment';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateSelect = ({clickDate, checked, newEvent, setNewEvent, targetName}) => {
   
   // 클릭 날짜 저장할 곳 선언
   //const [changeDate, setChangeDate] = useState(clickDate);
   function getFormattedDate(date, targetName){
      let result = '';
      if (checked) {
         result = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${targetName == 'start' ? '00:00:00' : '23:59:59'}`;
      } else {
         result = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:00`;  
      }
      let resultDate = new Date(result)
      return resultDate
   }

   return (
      <>
         {
            checked ?
            <DatePicker
               showIcon
               selected={clickDate}
               onChange={(date) => {
                  setNewEvent({
                     ...newEvent,
                     [targetName]:getFormattedDate(date, targetName)
                  })
               }}
               popperPlacement="top-end"
               showTimeSelect={false}
               dateFormat="yyyy-MM-dd"
            />
            :
            <DatePicker
               showIcon
               selected={clickDate}
               onChange={(date) => {
                  console.log('!!!' + date)
                  setNewEvent({
                     ...newEvent,
                     [targetName]:getFormattedDate(date, targetName)
                  })
               }}
               popperPlacement="top-end"
               showTimeSelect={true}
               timeFormat="HH:mm"
               timeIntervals={10}
               dateFormat="yyyy-MM-dd HH:mm"
               timeCaption="time"
            />
         }
      </>
   );
};

export default DateSelect;
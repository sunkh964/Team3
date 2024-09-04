import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateSelect = ({clickDate, newEvent, setNewEvent, targetName}) => {
   function getFormattedDate(date){
      let result = '';
      if (newEvent.allDay == 'Y') {
         result = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} 00:00:00`;
      } else {
         result = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:00`;  
      }
      let resultDate = new Date(result)
      return resultDate
   }

   if(newEvent.allDay != 'Y' && newEvent.allDay != 'N' ){
      newEvent.allDay = newEvent.allDay ? 'Y' : 'N'
   }

   return (
      <>
         {
            newEvent.allDay  == 'Y'?
            <DatePicker
               showIcon
               selected={clickDate}
               value={clickDate}
               onChange={(date) => {
                  console.log('1111' +getFormattedDate(date));
                  setNewEvent({
                     ...newEvent,
                     allDay : 'Y',
                     [targetName]:getFormattedDate(date)
                  })
               }}
               popperPlacement="top-end"
               showTimeSelect={false}
               dateFormat="yyyy-MM-dd"
               minDate={targetName == 'end' ? newEvent.start : null}
               
            />
            :
            <DatePicker
               showIcon
               selected={clickDate}
               value={clickDate}
               onChange={(date) => {
                  setNewEvent({
                     ...newEvent,
                     allDay : 'N',
                     [targetName]:getFormattedDate(date)
                  })
               }}
               popperPlacement="top-end"
               showTimeSelect={true}
               timeFormat="HH:mm"
               timeIntervals={30}
               dateFormat="yyyy-MM-dd HH:mm"
               timeCaption="time"
               minDate={targetName == 'end' ? newEvent.start : null}
            />
         }
      </>
   );
};

export default DateSelect;
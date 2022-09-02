const percentage = (sellPrice, offerPrice) => {
  let discount = ((sellPrice - offerPrice) / sellPrice) * 100;
  return Math.floor(discount);
};

// daysLeft("2022-07-25")
const daysLeft = (date) => {
  let today = new Date();
  let end = new Date(date);
  let one_day = 1000 * 60 * 60 * 24;
  let days_left = Math.ceil((end.getTime() - today.getTime()) / one_day);
  if (days_left > 0) return days_left;
  else if (days_left === 0) return 0;
  else return -1;
};

//countdown timer
const url = "https://blog.greenroots.info/how-to-create-a-countdown-timer-using-react-hooks"


const isImage = (url) => /\.(jpg|jpeg|png|webp|gif|svg|jfif)$/.test(url);

const isVideo = (url) => /\.(mp4|mov|wmv|avi|flv|f4v|mkv|webm|mp2|mpeg|swf)$/.test(url);
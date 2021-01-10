function updateImg(event) {
  const imgURL = window.URL.createObjectURL(event.target.files[0]);
  document.querySelector('#carImg').src = imgURL;
}

document.querySelector('#carImgBtn').addEventListener('change', updateImg);


export const pictureUpload = (url, data) => {
	return new Promise((resolve, reject) => {

		const formData = new FormData();
		formData.append('file', data);

		const xhr = new XMLHttpRequest();

		xhr.open('POST', url, true);
		xhr.send(formData);
		xhr.addEventListener('load', function() {
			if (this.status >= 400) {
				reject(this.response);
			} else {
				resolve(this.response);
			}
		});
	});
};

export const dataURLtoFile = dataurl => {
	const arr = dataurl.split(',');
	const mime = arr[0].match(/:(.*?);/)[1];
	const bstr = atob(arr[1].replace(/\s/g, ''));
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], 'jsjs.png', { type: mime });
};

export default pictureUpload;

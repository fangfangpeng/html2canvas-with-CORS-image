    // 本文件仅为示例！
    //导入html2canvas插件
    import html2canvas from 'html2canvas';
    import { pictureUpload, dataURLtoFile } from './upload.js';
    
    const imageList = [];
    async function cHtml2canvas() {
        // 克隆页面需要截图的节点，保证不影响源dom树结构
      const cloneDom = document.getElementById('targetCanvas').cloneNode(true);
      updateImg(cloneDom);
      cloneDom.id = '';
      cloneDom.className = '';
      cloneDom.style.backgroundColor = '#fff';
      cloneDom.style.position = 'absolute';
      cloneDom.style.top = '0px';
      cloneDom.style.zIndex = -100;
      cloneDom.style.width = '375px';
      cloneDom.style.height = '300px';
      cloneDom.style.minHeight = '200px';
      document.body.append(cloneDom);
      const screenShot = await html2canvas(cloneDom, { useCORS: true });
      imageList.forEach(img => {
        const imgItem = new Image();
        imgItem.src = img.src;
        imgItem.setAttribute('crossOrigin', 'anonymous');
        screenShot.drawImage(imgItem, img.style.left, img.style.top);
      });
      document.body.removeChild(cloneDom);
      if (screenShot) {
        const dataUrl = screenShot.toDataURL('image/png');
        const data = dataURLtoFile(dataUrl);
        const url = await pictureUpload('xxxx/upload/picture', data);
        if (url) {
          console.log(url);
          const result = JSON.parse(url);
          return result.retval;
        }
      }
      return null;
     }
    
    function updateImg(node) {
        imageList.length = 0;
        const nodeList = node.childNodes;
        for (let i = 0; i < nodeList.length; i++) {
          const childNode = nodeList[i];
          if (childNode.nodeName === 'IMG') {
            1.// 此处设置图片crossOrigin为'anonymous'
            childNode.setAttribute('crossOrigin', 'anonymous');
            2.//为跨域链接添加一个时间戳
            childNode.src = `${childNode.src}?v=${new Date().getTime()}`;
            this.imageList.push(childNode);
          } else if (childNode.childNodes.length > 0) {
            this.updateImg(childNode);
          }
        }
	}

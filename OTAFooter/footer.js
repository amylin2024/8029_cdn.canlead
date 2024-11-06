// create new link tag
const link = document.createElement("link");
// set properties of link tag
link.href = "https://cdn.canlead.com.tw/OTAFooter/footer.css";
link.rel = "stylesheet";
link.type = "text/css";
/*// Loaded successfully
link.onload = function() {
	console.log('success');
};
// Loading failed
link.onerror = function() {
	console.log('error');
};*/
// append link element to html
document.getElementsByTagName("head")[0].appendChild(link);

const footer = document.createElement("footer");
footer.className = "footer";
document.body.appendChild(footer);
footer.innerHTML = `
<div class="container p-md-0">
    <div class="row justify-content-center  flex-nowrap flogo_box">
        <div class="flogo_box_item">
            <img class="flogo_1 mx-sm-1 px-0"
            src="https://cdn.canlead.com.tw/_img/canlead_travel/logo_noPadding.svg" alt="">
        </div>
        <div class="flogo_box_item">
            <img class="flogo_2 mx-sm-1 px-0" src="https://cdn.canlead.com.tw/_img/canlead/logo_noPadding.svg"
            alt="">
        </div>
    </div>
    <div class="row">
        <div class="col-12  list_flogo_box my-2">
            <p class="mb-0 flex-shrink-0 d-flex align-items-center">肯驛國際所屬品牌</p>
            <ul class="list_flogo mb-0 ">
                <li class="footer-bottom__logo logo-UFirst-1"></li>
                <li class="footer-bottom__logo logo-UFirst-2"></li>
                <li class="footer-bottom__logo logo-DragonPass"></li>
                <li class="footer-bottom__logo logo-CallCarBar"></li>
                <li class="footer-bottom__logo logo-RoamingBar"></li>
                <li class="footer-bottom__logo logo-FreeLiving"></li>
                <li class="footer-bottom__logo logo-ARS"></li>
                <li class="footer-bottom__logo logo-Movie"></li>
                <li class="footer-bottom__logo logo-SmartTicket"></li>
                <li class="footer-bottom__logo logo-Help"></li>
                <li class="footer-bottom__logo logo-VIP"></li>
            </ul>
        </div>

        <div class="col-12 list_flogo_box my-1">
            <p class="mb-0 flex-shrink-0 d-flex align-items-center">肯驛國際集團關係企業</p>
            <ul class="list_flogo mb-0 ">
                <li class="footer-bottom__logo logo-CanleadTravel"></li>
                <li class="footer-bottom__logo logo-HeyCar"></li>
            </ul>
        </div>
    </div>
    <div class="row finfo_box pt-3">
        <div class="col-12 col-lg-6">
            <ul class="list_ISO mb-0">
                <li class="list_item">
                    <i class="icon_sprites icon_sprites_ISO_27001"></i>
                    <p class="mb-0">ISO 27001 認證</p>
                </li>

                <li class="list_item">
                    <i class="icon_sprites icon_sprites_ISO_27701"></i>
                    <p class="mb-0">ISO 27701 認證</p>
                </li>

                <li class="list_item">
                    <i class="icon_sprites icon_sprites_ISO_9001"></i>
                    <p class="mb-0">ISO 9001 認證</p>
                </li>
                <li class="list_item  w-100">
                    <p class="mb-0 w-100">通過 PCI DSS 支付卡產業資料安全標準認證</p>
                </li>
            </ul>
        </div>
        <div
            class="col-12 col-lg-6 d-flex justify-content-center justify-content-center justify-content-lg-start flex-lg-row flex-column ">
            <ul class="list_finfo me-lg-4">
                <li class="list_item">
                    服務提供商：肯驛國際(股)公司
                </li>

                <li class="list_item">
                    客服專線：<a href="tel:000@gmail.com">00-0000-0000</a>
                </li>

                <li class="list_item">
                    <a class="btn btn_line " href="https://www.canlead.com.tw/privacy.aspx">隱私權條款</a>
                </li>
            </ul>

            <ul class="list_fSMO">
                <li class="list_item">
                    <a href="#" target="_blank" class="btn-ftShare-fb"><i
                            class="fa-brands fa-square-facebook"></i></a>
                </li>

                <li class="list_item mt-1">
                    <a href="#" target="_blank" class="btn-ftShare-line"><i
                            class="fa-brands fa-line"></i></a>
                </li>
            </ul>
        </div>
    </div>
</div>
`;

// 設定 _footerInfo.json Footer 資訊
if (footerInfoURL) {
  fetch(footerInfoURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (footerInfo) {
      // 是否顯示集團logo
      if (!footerInfo.showGroupLogo) {
        const logos = document.querySelector(".list_flogo_box");
        logos.parentElement.removeChild(logos);
      }

      // 文字訊息列表
      const ListFooterItfo = document.querySelector(".list_finfo");
      let footerText = "";
      footerInfo.infoList.forEach((element) => {
        element.forEach((el) => {
          const [text, link, target] = [el.text, el.link, el.target];
          const settarget = target ? target : "_blank";
          if (link) {
            footerText += `<li class='list_item'><a href="${link}" target="${settarget}">${text}</a></li>`;
          } else {
            footerText += `<li>${text}</li>`;
          }
        });
      });
      if (footerInfo.privacy.text && footerInfo.privacy.link) {
        footerText += `<li class='list_item mt-1'><a class="btn btn_line mb-2" href="${footerInfo.privacy.link}" target="_blank">${footerInfo.privacy.text}</a></li>`;
      }
      ListFooterItfo.innerHTML = footerText;

      // SMO訊息列表
      const ListFooterSMO = document.querySelector(".list_fSMO");

      let fSMOText = "";
      footerInfo.smoList.forEach((element) => {
        element.forEach((el) => {
          const [icon, link, color, size, mt] = [
            el.icon,
            el.link,
            el.color,
            el.size,
            el.mt,
          ];
          fSMOText += `<li class='list_item'><a href="${link}" target="_blank" style="color:${color};font-size:${size};margin-top:${mt}">${icon}</a></li>`;
        });
      });

      ListFooterSMO.innerHTML = fSMOText;
    });
}

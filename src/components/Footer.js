import React, { Component } from 'react';
import '../supports/css/components/main.css';
import '../supports/css/components/font-awesome.min.css';

class Footer extends Component{
  render(){
    return (
      <footer className="footer-area section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="single-footer-widget">
                <h4 className="text-white" style={{ textAlign: 'left', fontSize: '25px' }}>About Us</h4>
                <p style={{ textAlign: 'left', color: '#fff' }}>
                  Warung Melati Mas merupakan warung makan pertama yang menyediakan fasilitas pemesanan secara online. Dengan menu-menu yang disajikan seperti warung makan pada umumnya, Anda tinggal meng-Klik pilihan menu yang ingin dipesan. 
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="single-footer-widget">
                <h4 className="text-white" style={{ textAlign: 'left', fontSize: '25px' }}>Contact Us</h4>
                <p style={{ textAlign: 'left', color: '#fff' }}>
                  Lokasi: Villa Melati Mas Blok H5 no. 8, Serpong Utara, Tangerang Selatan - Banten
                </p>
                <p className="number" style={{ textAlign: 'left' }}>
                  021-538 3377 <br/>
                  021-538 3388
                </p>
              </div>
            </div>						
            <div className="col-lg-5 col-md-6 col-sm-6">
              <div className="single-footer-widget">
                <h4 className="text-white" style={{ textAlign: 'left', fontSize: '25px' }}>Newsletter</h4>
                <p style={{ textAlign: 'left', color: '#fff' }}>You can trust us. we only send  offers, not a single spam.</p>
                <div className="d-flex flex-row" id="mc_embed_signup">


                    <form className="navbar-form" noValidate="true" action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01" method="get">
                      <div className="input-group add-on">
                          <input className="form-control" name="EMAIL" placeholder="Email address" onFocus={this.placeholder} onBlur={this.placeholder} type="email" required />
                      <div style={{position: 'absolute', left: '-5000px'}}>
                        <input name="b_36c4fd991d266f23781ded980_aefe40901a" tabIndex="-1" value="" type="text" />
                      </div>
                        <div className="input-group-btn">
                          <button className="genric-btn"><span className="lnr lnr-arrow-right"></span></button>
                        </div>
                      </div>
                        <div className="info mt-20"></div>									    
                    </form>

                </div>
              </div>
            </div>						
          </div>
          <div className="footer-bottom d-flex justify-content-between align-items-center flex-wrap">
            {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
            <p className="footer-text m-0" style={{ color: '#fff' }}>Copyright &copy; 2018 All rights reserved </p>
            {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
            <div className="footer-social d-flex align-items-center">
              <a><i className="fa fa-facebook"></i></a>
              <a><i className="fa fa-twitter"></i></a>
              <a><i className="fa fa-dribbble"></i></a>
              <a><i className="fa fa-behance"></i></a>
            </div>
          </div>
        </div>
    </footer>
    );
  }
}

export default Footer;
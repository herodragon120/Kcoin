import React from 'react';
//import '../../publics/js/bootstrap'

class Footer extends React.Component{
    render(){
        return (
            <footer>
                <div className="flex-container">
                    <div className="footer-logo">
                        Sàn giao dịch Kcoin
                    </div>
                    <div>
                        <h6>Products</h6>
                        <ol>
                            <li><a href="wallet/%23/index.html" target="_blank">Wallet</a></li>
                            <li><a href="api.html" target="_blank">API</a></li>
                            <li><a href="index.html">Explorer</a></li>
                            <li><a href="charts.html">Charts</a></li>
                        </ol>
                    </div>
                    <div>
                        <h6>Company</h6>
                        <ol>
                            <li><a href="https://www.blockchain.com/about" target="_blank">About</a></li>
                            <li><a href="https://www.blockchain.com/team" target="_blank">Team</a></li>
                            <li><a href="https://www.blockchain.com/careers" target="_blank">Careers</a></li>
                            <li><a href="https://www.blockchain.com/interview" target="_blank">Interviewing</a></li>
                        </ol>
                    </div>
                    <div>
                        <h6>Support</h6>
                        <ol>
                            <li><a href="#" target="_blank">Help Center</a></li>
                            <li><a href="#" target="_blank">Tutorials</a></li>
                            <li><a href="#">Learning Portal</a></li>
                            <li><a href="#" target="_blank">Status</a></li>
                        </ol>
                    </div>
                    <div>
                        <div className="dropup">
                            <a href="#">
                                <span>English</span>
                            </a>
                        </div>
                        <div className="dropup">
                            <a href="#" >
                                <span id="current-currency">Kcoin</span>
                            </a>
                        </div>
                        <div>
                            <span className="colon">Advanced view</span>



                            <a href="#">Enable</a>


                        </div>
                    </div>
                </div>
                <div className="flex-container">
                    <div className="copyright">
                        <span>©&nbsp;Kcoin Developers From Three</span>
                        <a href="#" target="_blank">Privacy</a>
                        <a href="#" target="_blank">Terms</a>
                        <a href="#" target="_blank">Law Enforcement Guide</a>
                        <a href="#" target="_blank">Advertise</a>
                    </div>

                </div>
            </footer>
        )
    }
}

module.exports = Footer;

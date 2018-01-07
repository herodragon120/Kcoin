import React from 'react';
import './style.css';
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
                            <li><a href="https://support.blockchain.com/" target="_blank">Help Center</a></li>
                            <li><a href="https://blog.blockchain.com/category/tutorials-and-guides" target="_blank">Tutorials</a></li>
                            <li><a href="wallet/bitcoin-faq.html">Learning Portal</a></li>
                            <li><a href="https://www.blockchain-status.com/" target="_blank">Status</a></li>
                        </ol>
                    </div>
                    <div>
                        <div className="dropup">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <span>English</span>
                                <i className="icon-down_arrow blue f-8"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right languages_select" style={{minwidth:"20px"}}>

                                <li>
                                    <a tabIndex="-1" href="id.html" data-code="id" title="Indonesian">
                                        <span>Bahasa Indonesia</span>
                                    </a>
                                </li>

                                <li>
                                    <a tabIndex="-1" href="ms.html" data-code="ms" title="Malay">
                                        <span>Bahasa Melayu</span>
                                    </a>
                                </li>

                                <li>
                                    <a tabIndex="-1" href="da.html" data-code="da" title="Danish">
                                        <span>Dansk</span>
                                    </a>
                                </li>

                                <li>
                                    <a tabIndex="-1" href="de.html" data-code="de" title="German">
                                        <span>Deutsch</span>
                                    </a>
                                </li>

                                <li>
                                    <a tabIndex="-1" href="en.html" data-code="en" title="English">
                                        <span>English</span>
                                    </a>
                                </li>

                                <li>
                                    <a tabIndex="-1" href="es.html" data-code="es" title="Spanish">
                                        <span>Español</span>
                                    </a>
                                </li>

                                <li>
                                    <a tabIndex="-1" href="fr.html" data-code="fr" title="French">
                                        <span>Français</span>
                                    </a>
                                </li>

                                <li>
                                    <a tabIndex="-1" href="it.html" data-code="it" title="Italian">
                                        <span>Italiano</span>
                                    </a>
                                </li>

                                <li>
                                    <a tabIndex="-1" href="hu.html" data-code="hu" title="Hungarian">
                                        <span>Magyar</span>
                                    </a>
                                </li>

                                <li>
                                    <a tabIndex="-1" href="nl.html" data-code="nl" title="Dutch">
                                        <span>Nederlands</span>
                                    </a>
                                </li>

                                <li>
                                    <a tabIndex="-1" href="no.html" data-code="no" title="Norwegian">
                                        <span>Norsk</span>
                                    </a>
                                </li>

                                <li>
                                    <a tabIndex="-1" href="pl.html" data-code="pl" title="Polish">
                                        <span>Polski</span>
                                    </a>
                                </li>

                                <li>
                                    <a tabIndex="-1" href="pt.html" data-code="pt" title="Portuguese">
                                        <span>Português</span>
                                    </a>
                                </li>

                                <li>
                                    <a tabIndex="-1" href="ro.html" data-code="ro" title="Romanian">
                                        <span>Română</span>
                                    </a>
                                </li>

                                <li>
                                    <a tabIndex="-1" href="sl.html" data-code="sl" title="Slovenian">
                                        <span>Slovenščina</span>
                                    </a>
                                </li>

                                <li>
                                    <a tabIndex="-1" href="fi.html" data-code="fi" title="Finnish">
                                        <span>Suomi</span>
                                    </a>
                                </li>

                                <li>
                                    <a tabIndex="-1" href="sv.html" data-code="sv" title="Swedish">
                                        <span>Svenska</span>
                                    </a>
                                </li>

                                <li>
                                    <a tabIndex="-1" href="vi.html" data-code="vi" title="Vietnam">
                                        <span>Tiếng</span>
                                    </a>
                                </li>

                                <li>
                                    <a tabIndex="-1" href="tr.html" data-code="tr" title="Turkish">
                                        <span>Türkçe</span>
                                    </a>
                                </li>

                                <li>
                                    <a tabIndex="-1" href="el.html" data-code="el" title="Greek">
                                        <span>Ελληνικά</span>
                                    </a>
                                </li>

                                <li>
                                    <a tabIndex="-1" href="ru.html" data-code="ru" title="Russian">
                                        <span>Русский</span>
                                    </a>
                                </li>

                                <li>
                                    <a tabIndex="-1" href="bg.html" data-code="bg" title="Bulgarian">
                                        <span>български език</span>
                                    </a>
                                </li>

                                <li>
                                    <a tabIndex="-1" href="hi.html" data-code="hi" title="Hindi">
                                        <span>हिन्दी</span>
                                    </a>
                                </li>

                                <li>
                                    <a tabIndex="-1" href="th.html" data-code="th" title="Thai">
                                        <span>ภาษาไทย</span>
                                    </a>
                                </li>

                                <li>
                                    <a tabIndex="-1" href="zh-cn.html" data-code="zh-cn" title="Chinese">
                                        <span>中文(简体)</span>
                                    </a>
                                </li>

                                <li>
                                    <a tabIndex="-1" href="zh-tw.html" data-code="zh-tw" title="Chinese">
                                        <span>中文(繁體)</span>
                                    </a>
                                </li>

                                <li>
                                    <a tabIndex="-1" href="ja.html" data-code="ja" title="Japanese">
                                        <span>日本語</span>
                                    </a>
                                </li>

                                <li>
                                    <a tabIndex="-1" href="ko.html" data-code="ko" title="Korean">
                                        <span>한국어</span>
                                    </a>
                                </li>

                            </ul>
                        </div>
                        <div className="dropup">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <span id="current-currency">Bitcoin</span>
                                <i className="icon-down_arrow blue f-8"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right currencies" style={{minwidth:"20px"}}>

                                <li value="CHF">
                                    <a href="index25cb.html?currency=CHF" data-currency="CHF">Swiss Franc</a>
                                </li>

                                <li value="CLP">
                                    <a href="indexf8ea.html?currency=CLP" data-currency="CLP">Chilean Peso</a>
                                </li>

                                <li value="AUD">
                                    <a href="index741e.html?currency=AUD" data-currency="AUD">Australian Dollar</a>
                                </li>

                                <li value="HKD">
                                    <a href="indexee1a.html?currency=HKD" data-currency="HKD">Hong Kong Dollar</a>
                                </li>

                                <li value="TWD">
                                    <a href="index9038.html?currency=TWD" data-currency="TWD">New Taiwan dollar</a>
                                </li>

                                <li value="EUR">
                                    <a href="indexde9d.html?currency=EUR" data-currency="EUR">Euro</a>
                                </li>

                                <li value="DKK">
                                    <a href="index8e83.html?currency=DKK" data-currency="DKK">Danish Krone</a>
                                </li>

                                <li value="CAD">
                                    <a href="index06e8.html?currency=CAD" data-currency="CAD">Canadian Dollar</a>
                                </li>

                                <li value="BTC">
                                    <a href="index60f9.html?currency=BTC" data-currency="BTC">Bitcoin</a>
                                </li>

                                <li value="SEK">
                                    <a href="index5d1e.html?currency=SEK" data-currency="SEK">Swedish Krona</a>
                                </li>

                                <li value="INR">
                                    <a href="index8c9b.html?currency=INR" data-currency="INR">Indian Rupee</a>
                                </li>

                                <li value="MBC">
                                    <a href="index1667.html?currency=MBC" data-currency="MBC">MilliBit (mBTC)</a>
                                </li>

                                <li value="CNY">
                                    <a href="indexd102.html?currency=CNY" data-currency="CNY">Chinese yuan</a>
                                </li>

                                <li value="THB">
                                    <a href="indexcbb0.html?currency=THB" data-currency="THB">Thai baht</a>
                                </li>

                                <li value="KRW">
                                    <a href="index054a.html?currency=KRW" data-currency="KRW">South Korean Won</a>
                                </li>

                                <li value="JPY">
                                    <a href="index6a8b.html?currency=JPY" data-currency="JPY">Japanese Yen</a>
                                </li>

                                <li value="PLN">
                                    <a href="indexdc8f.html?currency=PLN" data-currency="PLN">Polish Zloty</a>
                                </li>

                                <li value="GBP">
                                    <a href="indexbfa2.html?currency=GBP" data-currency="GBP">Great British Pound</a>
                                </li>

                                <li value="UBC">
                                    <a href="index3558.html?currency=UBC" data-currency="UBC">Bits (uBTC)</a>
                                </li>

                                <li value="RUB">
                                    <a href="index15d7.html?currency=RUB" data-currency="RUB">Russian Ruble</a>
                                </li>

                                <li value="ISK">
                                    <a href="indexe023.html?currency=ISK" data-currency="ISK">Icelandic Króna</a>
                                </li>

                                <li value="USD">
                                    <a href="index0307.html?currency=USD" data-currency="USD">U.S. dollar</a>
                                </li>

                                <li value="SGD">
                                    <a href="index02fd.html?currency=SGD" data-currency="SGD">Singapore Dollar</a>
                                </li>

                                <li value="NZD">
                                    <a href="index8f22.html?currency=NZD" data-currency="NZD">New Zealand Dollar</a>
                                </li>
                                <li value="BRL">
                                    <a href="index3a16.html?currency=BRL" data-currency="BRL">Brazil Real</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <span className="colon">Advanced view</span>
                            <a href="index85a2.html?show_adv=true">Enable</a>
                        </div>
                    </div>
                </div>
                <div className="flex-container">
                    <div className="copyright">
                        <span>©&nbsp;2017 Blockchain Luxembourg S.A. All Rights Reserved.</span>
                        <a href="https://blockchain.com/privacy" target="_blank">Privacy</a>
                        <a href="https://blockchain.com/terms" target="_blank">Terms</a>
                        <a href="https://blockchain.com/legal" target="_blank">Law Enforcement Guide</a>
                        <a href="advertise.html" target="_blank">Advertise</a>
                    </div>
                </div>
            </footer>
        )
    }
}

module.exports = Footer;
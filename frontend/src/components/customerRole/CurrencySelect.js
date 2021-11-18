import React, { useState } from "react";
import axios from "axios";

export default function CurrencySelect(props) {
  return (
    <div class="dropdown">
    <button type="button" class="btn dropdown-toggle"  style = {{backgroundColor : "#764A34", color : "#ffffff", borderRadius : "5px"}}data-toggle="dropdown">
      Currency Change
    </button>
    <div class="dropdown-menu">
       <option  class = "dropdown-item" value="AFN">Afghan Afghani</option>
       <option class = "dropdown-item"  value="AFN" >Afghan Afghani</option>
         <option   class = "dropdown-item" value="ALL">Albanian Lek</option>
         <option  class = "dropdown-item" value="DZD">Algerian Dinar</option>
         <option  class = "dropdown-item" value="AOA">Angolan Kwanza</option>
         <option  class = "dropdown-item" value="ARS">Argentine Peso</option>
         <option class = "dropdown-item"  value="AMD">Armenian Dram</option>
         <option class = "dropdown-item"  value="AWG">Aruban Florin</option>
         <option class = "dropdown-item"  value="AUD">Australian Dollar</option>
         <option class = "dropdown-item"  value="AZN">Azerbaijani Manat</option>
         <option class = "dropdown-item"  value="BSD">Bahamian Dollar</option>
         <option class = "dropdown-item"  value="BHD">Bahraini Dinar</option>
         <option class = "dropdown-item"  value="BDT">Bangladeshi Taka</option>
         <option class = "dropdown-item"  value="BBD">Barbadian Dollar</option>
         <option class = "dropdown-item"  value="BYR">Belarusian Ruble</option>
         <option class = "dropdown-item"  value="BEF">Belgian Franc</option>
         <option class = "dropdown-item"  value="BZD">Belize Dollar</option>
         <option class = "dropdown-item"  value="BMD">Bermudan Dollar</option>
         <option class = "dropdown-item"  value="BTN">Bhutanese Ngultrum</option>
         <option class = "dropdown-item"  value="BTC">Bitcoin</option>
         <option class = "dropdown-item"  value="BOB">Bolivian Boliviano</option>
         <option class = "dropdown-item"  value="BAM">Bosnia-Herzegovina Convertible Mark</option>
         <option class = "dropdown-item"  value="BWP">Botswanan Pula</option>
         <option class = "dropdown-item"  value="BRL">Brazilian Real</option>
         <option class = "dropdown-item"  value="GBP">British Pound Sterling</option>
         <option class = "dropdown-item"  value="BND">Brunei Dollar</option>
         <option class = "dropdown-item"  value="BGN">Bulgarian Lev</option>
         <option class = "dropdown-item"  value="BIF">Burundian Franc</option>
         <option class = "dropdown-item"  value="KHR">Cambodian Riel</option>
         <option class = "dropdown-item"  value="CAD">Canadian Dollar</option>
         <option class = "dropdown-item"  value="CVE">Cape Verdean Escudo</option>
         <option class = "dropdown-item"  value="KYD">Cayman Islands Dollar</option>
         <option class = "dropdown-item"  value="XOF">CFA Franc BCEAO</option>
         <option class = "dropdown-item"  value="XAF">CFA Franc BEAC</option>
         <option class = "dropdown-item"  value="XPF">CFP Franc</option>
         <option class = "dropdown-item"  value="CLP">Chilean Peso</option>
         <option class = "dropdown-item"  value="CNY">Chinese Yuan</option>
         <option class = "dropdown-item"  value="COP">Colombian Peso</option>
         <option class = "dropdown-item"  value="KMF">Comorian Franc</option>
         <option class = "dropdown-item"  value="CDF">Congolese Franc</option>
         <option class = "dropdown-item"  value="CRC">Costa Rican ColÃ³n</option>
         <option class = "dropdown-item"  value="HRK">Croatian Kuna</option>
         <option class = "dropdown-item"  value="CUC">Cuban Convertible Peso</option>
         <option class = "dropdown-item"  value="CZK">Czech Republic Koruna</option>
         <option class = "dropdown-item"  value="DKK">Danish Krone</option>
         <option class = "dropdown-item"  value="DJF">Djiboutian Franc</option>
         <option class = "dropdown-item"  value="DOP">Dominican Peso</option>
         <option class = "dropdown-item"  value="XCD">East Caribbean Dollar</option>
         <option class = "dropdown-item"  value="EGP">Egyptian Pound</option>
         <option class = "dropdown-item"  value="ERN">Eritrean Nakfa</option>
         <option class = "dropdown-item"  value="EEK">Estonian Kroon</option>
         <option class = "dropdown-item"  value="ETB">Ethiopian Birr</option>
         <option class = "dropdown-item"  value="EUR">Euro</option>
         <option class = "dropdown-item"  value="FKP">Falkland Islands Pound</option>
         <option class = "dropdown-item"  value="FJD">Fijian Dollar</option>
         <option class = "dropdown-item"  value="GMD">Gambian Dalasi</option>
         <option class = "dropdown-item"  value="GEL">Georgian Lari</option>
         <option class = "dropdown-item"  value="DEM">German Mark</option>
         <option class = "dropdown-item"  value="GHS">Ghanaian Cedi</option>
         <option class = "dropdown-item"  value="GIP">Gibraltar Pound</option>
         <option class = "dropdown-item"  value="GRD">Greek Drachma</option>
         <option class = "dropdown-item"  value="GTQ">Guatemalan Quetzal</option>
         <option class = "dropdown-item"  value="GNF">Guinean Franc</option>
         <option class = "dropdown-item"  value="GYD">Guyanaese Dollar</option>
         <option class = "dropdown-item"  value="HTG">Haitian Gourde</option>
         <option class = "dropdown-item"  value="HNL">Honduran Lempira</option>
         <option class = "dropdown-item"  value="HKD">Hong Kong Dollar</option>
         <option class = "dropdown-item"  value="HUF">Hungarian Forint</option>
         <option class = "dropdown-item"  value="ISK">Icelandic KrÃ³na</option>
         <option class = "dropdown-item"  value="INR">Indian Rupee</option>
         <option class = "dropdown-item"  value="IDR">Indonesian Rupiah</option>
         <option class = "dropdown-item"  value="IRR">Iranian Rial</option>
         <option class = "dropdown-item"  value="IQD">Iraqi Dinar</option>
         <option class = "dropdown-item"  value="ILS">Israeli New Sheqel</option>
         <option class = "dropdown-item"  value="ITL">Italian Lira</option>
         <option class = "dropdown-item"  value="JMD">Jamaican Dollar</option>
         <option class = "dropdown-item"  value="JPY">Japanese Yen</option>
         <option class = "dropdown-item"  value="JOD">Jordanian Dinar</option>
         <option class = "dropdown-item"  value="KZT">Kazakhstani Tenge</option>
         <option class = "dropdown-item"  value="KES">Kenyan Shilling</option>
         <option class = "dropdown-item"  value="KWD">Kuwaiti Dinar</option>
         <option class = "dropdown-item"  value="KGS">Kyrgystani Som</option>
         <option class = "dropdown-item"  value="LAK">Laotian Kip</option>
         <option class = "dropdown-item"  value="LVL">Latvian Lats</option>
         <option class = "dropdown-item"  value="LBP">Lebanese Pound</option>
         <option class = "dropdown-item"  value="LSL">Lesotho Loti</option>
         <option class = "dropdown-item"  value="LRD">Liberian Dollar</option>
         <option class = "dropdown-item"  value="LYD">Libyan Dinar</option>
         <option class = "dropdown-item"  value="LTL">Lithuanian Litas</option>
         <option class = "dropdown-item"  value="MOP">Macanese Pataca</option>
         <option class = "dropdown-item"  value="MKD">Macedonian Denar</option>
         <option class = "dropdown-item"  value="MGA">Malagasy Ariary</option>
         <option class = "dropdown-item"  value="MWK">Malawian Kwacha</option>
         <option class = "dropdown-item"  value="MYR">Malaysian Ringgit</option>
         <option class = "dropdown-item"  value="MVR">Maldivian Rufiyaa</option>
         <option class = "dropdown-item"  value="MRO">Mauritanian Ouguiya</option>
         <option class = "dropdown-item"  value="MUR">Mauritian Rupee</option>
         <option class = "dropdown-item"  value="MXN">Mexican Peso</option>
         <option class = "dropdown-item"  value="MDL">Moldovan Leu</option>
         <option class = "dropdown-item"  value="MNT">Mongolian Tugrik</option>
         <option class = "dropdown-item"  value="MAD">Moroccan Dirham</option>
         <option class = "dropdown-item"  value="MZM">Mozambican Metical</option>
         <option class = "dropdown-item"  value="MMK">Myanmar Kyat</option>
         <option class = "dropdown-item"  value="NAD">Namibian Dollar</option>
         <option class = "dropdown-item"  value="NPR">Nepalese Rupee</option>
         <option class = "dropdown-item"  value="ANG">Netherlands Antillean Guilder</option>
         <option class = "dropdown-item"  value="TWD">New Taiwan Dollar</option>
         <option class = "dropdown-item"  value="NZD">New Zealand Dollar</option>
         <option class = "dropdown-item"  value="NIO">Nicaraguan CÃ³rdoba</option>
         <option class = "dropdown-item"  value="NGN">Nigerian Naira</option>
         <option class = "dropdown-item"  value="KPW">North Korean Won</option>
         <option class = "dropdown-item"  value="NOK">Norwegian Krone</option>
         <option class = "dropdown-item"  value="OMR">Omani Rial</option>
         <option class = "dropdown-item"  value="PKR">Pakistani Rupee</option>
         <option class = "dropdown-item"  value="PAB">Panamanian Balboa</option>
         <option class = "dropdown-item"  value="PGK">Papua New Guinean Kina</option>
         <option class = "dropdown-item"  value="PYG">Paraguayan Guarani</option>
         <option class = "dropdown-item"  value="PEN">Peruvian Nuevo Sol</option>
         <option class = "dropdown-item"  value="PHP">Philippine Peso</option>
         <option class = "dropdown-item"  value="PLN">Polish Zloty</option>
         <option class = "dropdown-item"  value="QAR">Qatari Rial</option>
         <option class = "dropdown-item"  value="RON">Romanian Leu</option>
         <option class = "dropdown-item"  value="RUB">Russian Ruble</option>
         <option class = "dropdown-item"  value="RWF">Rwandan Franc</option>
         <option class = "dropdown-item"  value="SVC">Salvadoran ColÃ³n</option>
         <option class = "dropdown-item"  value="WST">Samoan Tala</option>
         <option class = "dropdown-item"  value="SAR">Saudi Riyal</option>
         <option class = "dropdown-item"  value="RSD">Serbian Dinar</option>
         <option class = "dropdown-item"  value="SCR">Seychellois Rupee</option>
         <option class = "dropdown-item"  value="SLL">Sierra Leonean Leone</option>
         <option class = "dropdown-item"  value="SGD">Singapore Dollar</option>
         <option class = "dropdown-item"  value="SKK">Slovak Koruna</option>
         <option class = "dropdown-item"  value="SBD">Solomon Islands Dollar</option>
         <option class = "dropdown-item"  value="SOS">Somali Shilling</option>
         <option class = "dropdown-item"  value="ZAR">South African Rand</option>
         <option class = "dropdown-item"  value="KRW">South Korean Won</option>
         <option class = "dropdown-item"  value="XDR">Special Drawing Rights</option>
         <option class = "dropdown-item"  value="LKR">Sri Lankan Rupee</option>
         <option class = "dropdown-item"  value="SHP">St. Helena Pound</option>
         <option class = "dropdown-item"  value="SDG">Sudanese Pound</option>
         <option class = "dropdown-item"  value="SRD">Surinamese Dollar</option>
         <option class = "dropdown-item"  value="SZL">Swazi Lilangeni</option>
         <option class = "dropdown-item"  value="SEK">Swedish Krona</option>
         <option class = "dropdown-item"  value="CHF">Swiss Franc</option>
         <option class = "dropdown-item"  value="SYP">Syrian Pound</option>
         <option class = "dropdown-item"  value="STD">São Tomé and Príncipe Dobra</option>
         <option class = "dropdown-item"  value="TJS">Tajikistani Somoni</option>
         <option class = "dropdown-item"  value="TZS">Tanzanian Shilling</option>
         <option class = "dropdown-item"  value="THB">Thai Baht</option>
         <option class = "dropdown-item"  value="TOP">Tongan pa'anga</option>
         <option class = "dropdown-item"  value="TTD">Trinidad & Tobago Dollar</option>
         <option class = "dropdown-item"  value="TND">Tunisian Dinar</option>
         <option class = "dropdown-item"  value="TRY">Turkish Lira</option>
         <option class = "dropdown-item"  value="TMT">Turkmenistani Manat</option>
         <option class = "dropdown-item"  value="UGX">Ugandan Shilling</option>
         <option class = "dropdown-item"  value="UAH">Ukrainian Hryvnia</option>
         <option class = "dropdown-item"  value="AED">United Arab Emirates Dirham</option>
         <option class = "dropdown-item"  value="UYU">Uruguayan Peso</option>
         <option class = "dropdown-item"  value="USD">US Dollar</option>
         <option class = "dropdown-item"  value="UZS">Uzbekistan Som</option>
         <option class = "dropdown-item"  value="VUV">Vanuatu Vatu</option>
         <option class = "dropdown-item"  value="VEF">Venezuelan BolÃ­var</option>
         <option class = "dropdown-item"  value="VND">Vietnamese Dong</option>
         <option class = "dropdown-item"  value="YER">Yemeni Rial</option>
         <option class = "dropdown-item"  value="ZMK">Zambian Kwacha</option>


    </div>
  </div>
  );
}

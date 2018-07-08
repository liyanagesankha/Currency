namespace Currency.WebAPI.Models
{
    /// <summary>
    /// Model for the currency data
    /// </summary>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
    [System.Xml.Serialization.XmlRootAttribute(Namespace = "", IsNullable = false)]
    public class web_dis_rates
    {
        private web_dis_ratesTimestamp timestampField;

        private web_dis_ratesRow[] rowField;

        private string copyrightField;

        /// <remarks/>
        public web_dis_ratesTimestamp timestamp
        {
            get
            {
                return this.timestampField;
            }
            set
            {
                this.timestampField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute("row")]
        public web_dis_ratesRow[] row
        {
            get
            {
                return this.rowField;
            }
            set
            {
                this.rowField = value;
            }
        }

        /// <remarks/>
        public string copyright
        {
            get
            {
                return this.copyrightField;
            }
            set
            {
                this.copyrightField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
    public partial class web_dis_ratesTimestamp
    {

        private string descField;

        private string valueField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string Desc
        {
            get
            {
                return this.descField;
            }
            set
            {
                this.descField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlTextAttribute()]
        public string Value
        {
            get
            {
                return this.valueField;
            }
            set
            {
                this.valueField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
    public partial class web_dis_ratesRow
    {

        private string swift_codeField;

        private string swift_nameField;

        private byte multiplyField;

        private string buy_cashField;

        private string buy_tcField;

        private string sell_cashField;

        private string sell_tcField;

        private web_dis_ratesRowCurrencyGuide currencyGuideField;

        private string base_swiftField;

        /// <remarks/>
        public string swift_code
        {
            get
            {
                return this.swift_codeField;
            }
            set
            {
                this.swift_codeField = value;
            }
        }

        /// <remarks/>
        public string swift_name
        {
            get
            {
                return this.swift_nameField;
            }
            set
            {
                this.swift_nameField = value;
            }
        }

        /// <remarks/>
        public byte multiply
        {
            get
            {
                return this.multiplyField;
            }
            set
            {
                this.multiplyField = value;
            }
        }

        /// <remarks/>
        public string buy_cash
        {
            get
            {
                return this.buy_cashField;
            }
            set
            {
                this.buy_cashField = value;
            }
        }

        /// <remarks/>
        public string buy_tc
        {
            get
            {
                return this.buy_tcField;
            }
            set
            {
                this.buy_tcField = value;
            }
        }

        /// <remarks/>
        public string sell_cash
        {
            get
            {
                return this.sell_cashField;
            }
            set
            {
                this.sell_cashField = value;
            }
        }

        /// <remarks/>
        public string sell_tc
        {
            get
            {
                return this.sell_tcField;
            }
            set
            {
                this.sell_tcField = value;
            }
        }

        /// <remarks/>
        public web_dis_ratesRowCurrencyGuide CurrencyGuide
        {
            get
            {
                return this.currencyGuideField;
            }
            set
            {
                this.currencyGuideField = value;
            }
        }

        /// <remarks/>
        public string base_swift
        {
            get
            {
                return this.base_swiftField;
            }
            set
            {
                this.base_swiftField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
    public partial class web_dis_ratesRowCurrencyGuide
    {

        private string baseSwiftField;

        private string swiftField;

        private byte amountField;

        private string valueField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string BaseSwift
        {
            get
            {
                return this.baseSwiftField;
            }
            set
            {
                this.baseSwiftField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string Swift
        {
            get
            {
                return this.swiftField;
            }
            set
            {
                this.swiftField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public byte Amount
        {
            get
            {
                return this.amountField;
            }
            set
            {
                this.amountField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlTextAttribute()]
        public string Value
        {
            get
            {
                return this.valueField;
            }
            set
            {
                this.valueField = value;
            }
        }
    }
}
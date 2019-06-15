// pages/pay-tax.js
Page({

  /**
   * Page initial data
   */
  data: {
    //input
    beforeMonthlyPay: 0.0,
    houseFundNumber: 0.0,
    houseFundProportion: 0.0,
    insuranceNumber: 0.0,
    pensionProportion: 0.0,
    unemployedProportion: 0.0,
    medicalProportion: 0.0,

    houseLoadSelected: false,
    houseRentSelected: false,
    childrenEducationSelected: false,
    medicalSelected: false,
    selfEducationSelected: false,
    oldSelected: false,
    houseLoadDeduction: 0,
    houseRentDeduction: 0,
    childrenEducationDeduction: 0,
    medicalDeduction: 0,
    selfEducationDeduction: 0,
    oldDeduction: 0,

    houseRentModal: false,
    childrenEducationModal: false,
    medicalModal: false,
    selfEducationModal: false,
    oldModal: false,

    houseRentRadios: [{
        idx: 0,
        name: '省会、直辖市、计划单列市',
        checked: false,
        value: 1200
      },
      {
        idx: 1,
        name: '人口规模大于100万',
        checked: false,
        value: 1000
      },
      {
        idx: 2,
        name: '人口规模小于100万',
        checked: false,
        value: 800
      },
    ],
    selfEducationRadios: [{
      idx: 0,
      name: '学历继续教育',
      checked: false,
      value: 400
    },
    {
      idx: 1,
      name: '技能人员、专业技术人员职业资格继续教育',
      checked: false,
      value: 300
    }
    ],
    //output
    monthlyPays: []
  },

  calculatePay: function() {
    let beforeMonthlyPay = this.data.beforeMonthlyPay
    let houseFund = this.data.houseFundNumber * this.data.houseFundProportion
    let insurance = this.data.pensionProportion * this.data.unemployedProportion * this.data.medicalProportion
    let specialDeduction = this.data.houseLoadDeduction + this.data.houseLoadDeduction + this.data.childrenEducationDeduction + this.data.medicalDeduction + this.data.selfEducationDeduction + this.data.oldDeduction
    let deductionRate = [0,0.03,0.1,0.2,0.25,0.3,0.35,0.45]
    let quickDeduction = [0,2520,16920,31920,52920,85920,181920]
    let monthlyPays = []
    for (let i = 1; i <= 12; i++) {
      let monthlyPay = {}
      monthlyPay['month'] = i + '月'
      monthlyPay['beforePay'] = beforeMonthlyPay
      monthlyPay['fund'] = houseFund + insurance
      let deduction = monthlyPay['beforePay'] * i - 5000 * i - monthlyPay['fund'] * i - specialDeduction*i
      if(deduction <= 0){
        monthlyPay['tax'] = 0.0
      } else if (deduction<36000){
        monthlyPay['tax'] = deduction * 0.03
      } else if (deduction<144000){
        monthlyPay['tax'] = deduction * 0.1 - 2520
      } else if (deduction < 300000) {
        monthlyPay['tax'] = deduction * 0.2 - 16920
      } else if (deduction < 420000) {
        monthlyPay['tax'] = deduction * 0.25 - 31920
      } else if (deduction < 660000) {
        monthlyPay['tax'] = deduction * 0.3 - 52920
      } else if (deduction < 960000) {
        monthlyPay['tax'] = deduction * 0.35 - 85920
      } else {
        monthlyPay['tax'] = deduction * 0.4 - 181920
      } 
      monthlyPay['afterPay'] = monthlyPay['beforePay'] - monthlyPay['fund'] - monthlyPay['tax']
      monthlyPays.push(monthlyPay)
    }
    this.setData({
      monthlyPays: monthlyPays
    })
  },

  preventTouchMove: function() {},

  houseLoadClick: function(event) {
    let selected = this.data.houseLoadSelected
    let houseLoadDeduction = this.data.houseLoadDeduction
    if (selected) {
      this.setData({
        houseLoadSelected: !selected,
        houseLoadDeduction: 0
      })
    } else {
      this.setData({
        houseLoadSelected: !selected,
        houseRentSelected: false,
        houseRentDeduction: 0,
        houseLoadDeduction: 1000
      })
    }
  },
  houseRentChange: function(event) {
    let idx = event.detail.value;
    let houseRentRadios = this.data.houseRentRadios
    for (let i = 0; i < houseRentRadios.length; i++) {
      houseRentRadios[i].checked = (i == idx)
    }
    this.setData({
      houseRentRadios: houseRentRadios,
      houseRentDeduction: houseRentRadios[idx].value,
    })
  },
  houseRentConfirm: function(event) {
    this.setData({
      houseRentModal: false
    })
  },
  houseRentClick: function (event) {
    let selected = this.data.houseRentSelected
    if (selected) {
      this.setData({
        houseRentSelected: !selected,
        houseRentDeduction: 0
      })
    } else {
      this.setData({
        houseRentSelected: !selected,
        houseLoadSelected:false,
        houseLoadDeduction: 0,
        houseRentModal: true
      })
    }
  },
  childrenNumberChange: function(event) {
    if (event.detail.value.length < 1) {
      this.setData({
        childrenEducationDeduction: 0
      })
    } else {
      this.setData({
        childrenEducationDeduction: Number(event.detail.value) * 1000
      })
    }
  },
  childrenEducationConfirm: function(event) {
    this.setData({
      childrenEducationModal: false
    })
  },
  childrenEducationClick: function(event) {
    let selected = this.data.childrenEducationSelected
    if (selected) {
      this.setData({
        childrenEducationSelected: !selected,
        childrenEducationDeduction:0
      })
    } else {
      this.setData({
        childrenEducationSelected: !selected,
        childrenEducationModal: true
      })
    }
  },
  medicalChange: function (event) {
    if (event.detail.value.length < 1) {
      this.setData({
        medicalDeduction: 0
      })
    } else{
      this.setData({
        medicalDeduction: Number(event.detail.value)
      })
    }
  },
  medicalConfirm: function (event) {
    if (this.data.medicalDeduction > 5000) {
      wx.showToast({
        title: '每个月标准限额不得超过5000元',
        icon: 'none',
        duration: 2000//持续的时间
      })
    }else{
      this.setData({
      medicalModal: false
    })
    }
  },
  medicalClick: function(event) {
    
    let selected = this.data.medicalSelected
    if (selected) {
      this.setData({
        medicalSelected: !selected,
        medicalDeduction:0
      })
    } else {
      this.setData({
        medicalSelected: !selected,
        medicalModal: true
      })
    }
  },
  selfEducationChange: function(event){
    let idx = event.detail.value;
    let selfEducationRadios = this.data.selfEducationRadios
    for (let i = 0; i <selfEducationRadios.length; i++) {
      selfEducationRadios[i].checked = (i == idx)
    }
    this.setData({
      selfEducationRadios: selfEducationRadios,
      selfEducationDeduction: selfEducationRadios[idx].value,
    })
  },
  selfEducationConfirm: function (event) {
    this.setData({
      selfEducationModal: false
    })
  },
  selfEducationClick: function(event) {
    let selected = this.data.selfEducationSelected
    if (selected) {
      this.setData({
        selfEducationSelected: !selected,
        selfEducationDeduction: 0
      })
    } else {
      this.setData({
        selfEducationSelected: !selected,
        selfEducationModal: true
      })
    }
  },
  oldChange: function (event) {
    if (event.detail.value.length < 1) {
      this.setData({
        oldDeduction: 0
      })
    } else {
      this.setData({
       oldDeduction: 2000/(Number(event.detail.value))
      })
    }
  },
  oldConfirm: function (event) {
    this.setData({
      oldModal: false
    })
  },
  oldClick: function(event) {
    let selected = this.data.oldSelected
    if (selected) {
      this.setData({
        oldSelected: !selected,
        oldDeduction: 0
      })
    } else {
      this.setData({
        oldSelected: !selected,
        oldModal: true
      })
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    let monthlyPays = []
    for (let i = 1; i <= 12; i++) {
      let monthlyPay = {}
      monthlyPay['month'] = i + '月'
      monthlyPay['beforePay'] = 0.0
      monthlyPay['fund'] = 0.0
      monthlyPay['tax'] = 0.0
      monthlyPay['afterPay'] = 0.0
      monthlyPays.push(monthlyPay)
    }
    this.setData({
      monthlyPays: monthlyPays
    })
  },
  //月收入
  inputPay: function(event) {
    if (event.detail.value.length < 1) {
      this.setData({
        beforeMonthlyPay: 0.0,
      })
    } else {
      this.setData({
        beforeMonthlyPay: Number(event.detail.value)
      })
    }
    console.log(this.data.beforeMonthlyPay)
  },
  //公积金
  inputHouseFundNumber: function(event) {
    if (event.detail.value.length < 1) {
      this.setData({
        houseFundNumber: 0.0,
      })
    } else {
      this.setData({
        houseFundNumber: Number(event.detail.value)
      })
    }
    console.log(this.data.houseFundNumber)
  },
  inputHouseFundProportion: function(event) {
    if (event.detail.value.length < 1) {
      this.setData({
        houseFundProportion: 0.0,
      })
    } else {
      this.setData({
        houseFundProportion: Number(event.detail.value) / 100.0
      })
    }
    console.log(this.data.houseFundProportion)
  },
  //社保
  inputInsuranceNumber: function(event) {
    if (event.detail.value.length < 1) {
      this.setData({
        insuranceNumber: 0.0,
      })
    } else {
      this.setData({
        insuranceNumber: Number(event.detail.value)
      })
    }
    console.log(this.data.insuranceNumber)
  },
  inputPensionProportion: function(event) {
    if (event.detail.value.length < 1) {
      this.setData({
        pensionProportion: 0.0,
      })
    } else {
      this.setData({
        pensionProportion: Number(event.detail.value) / 100.0
      })
    }
    console.log(this.data.pensionProportion)
  },
  inputUnemployedProportion: function(event) {
    if (event.detail.value.length < 1) {
      this.setData({
        unemployedProportion: 0.0,
      })
    } else {
      this.setData({
        unemployedProportion: Number(event.detail.value) / 100.0
      })
    }
    console.log(this.data.unemployedProportion)
  },
  inputMedicalProportion: function(event) {
    if (event.detail.value.length < 1) {
      this.setData({
        medicalProportion: 0.0,
      })
    } else {
      this.setData({
        medicalProportion: Number(event.detail.value) / 100.0
      })
    }
    console.log(this.data.medicalProportion)
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  }
})
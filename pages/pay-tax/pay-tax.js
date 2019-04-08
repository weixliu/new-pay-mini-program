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
    houseLoadDeduction: 1000,
    houseRentDeduction: 1500,
    childrenEducationDeduction: 1000,
    medicalDeduction: 0,
    selfEducationDeduction: 300,
    oldDeduction: 2000,

    houseRentModal: false,
    childrenEducationModal: false,
    medicalModal: false,
    selfEducationModal: false,
    oldModal: false,

    houseRentRadios: [{
        idx: 0,
        name: '省会、直辖市、计划单列市',
        checked: false,
        value: 1500
      },
      {
        idx: 1,
        name: '人口规模大于100万',
        checked: false,
        value: 1100
      },
      {
        idx: 2,
        name: '人口规模小于100万',
        checked: false,
        value: 800
      },
    ],

    //output
    monthlyPays: []
  },

  calculatePay: function() {

  },

  preventTouchMove: function() {},

  houseLoadClick: function(event) {
    let selected = this.data.houseLoadSelected
    if (selected) {
      this.setData({
        houseLoadSelected: !selected
      })
    } else {
      this.setData({
        houseLoadSelected: !selected
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
  houseRentClick: function(event) {
    let selected = this.data.houseRentSelected
    if (selected) {
      this.setData({
        houseRentSelected: !selected
      })
    } else {
      this.setData({
        houseRentSelected: !selected,
        houseRentModal: true
      })
    }
  },
  childrenEducationClick: function(event) {
    let selected = this.data.childrenEducationSelected
    if (selected) {
      this.setData({
        childrenEducationSelected: !selected
      })
    } else {
      this.setData({
        childrenEducationSelected: !selected,
        childrenEducationModal: true
      })
    }
  },
  medicalClick: function(event) {
    let selected = this.data.medicalSelected
    if (selected) {
      this.setData({
        medicalSelected: !selected
      })
    } else {
      this.setData({
        medicalSelected: !selected,
        medicalModal: true
      })
    }
  },
  selfEducationClick: function(event) {
    let selected = this.data.selfEducationSelected
    if (selected) {
      this.setData({
        selfEducationSelected: !selected
      })
    } else {
      this.setData({
        selfEducationSelected: !selected,
        selfEducationModal: true
      })
    }
  },
  oldClick: function(event) {
    let selected = this.data.oldSelected
    if (selected) {
      this.setData({
        oldSelected: !selected
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
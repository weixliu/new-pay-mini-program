// pages/bonus/bonus.js
Page({

  /**
   * Page initial data
   */
  data: {
    taxLadders: [
      {
        taxRate: 3,
        minTax: 0,
        maxTax: 3000,
        quickDeduction: 0
      },
      {
        taxRate: 10,
        minTax: 3000,
        maxTax: 12000,
        quickDeduction: 210
      },
      {
        taxRate: 20,
        minTax: 12000,
        maxTax: 25000,
        quickDeduction: 1410
      },
      {
        taxRate: 25,
        minTax: 25000,
        maxTax: 35000,
        quickDeduction: 2660
      },
      {
        taxRate: 30,
        minTax: 35000,
        maxTax: 55000,
        quickDeduction: 4410
      },
      {
        taxRate: 35,
        minTax: 55000,
        maxTax: 80000,
        quickDeduction: 7160
      },
      {
        taxRate: 45,
        minTax: 80000,
        maxTax: Number.MAX_SAFE_INTEGER,
        quickDeduction: 15160
      },
    ],

    taxBeforeBonus: 0.0,
    taxRate: 0.0,
    quickDeduction: 0.0,
    taxAfterBonus: 0.0,
    taxLadderHighLightIdx: -1,
    calculated: false
  },

  calculate: function () {
    let taxBeforeBonus = this.data.taxBeforeBonus
    let monthTaxBeforeBonus = taxBeforeBonus / 12
    let taxRate = 0
    let quickDeduction = 0
    let taxLadders = this.data.taxLadders
    let taxLadderHighLightIdx = -1
    for (let i = 0; i < taxLadders.length;i++) {
      if(monthTaxBeforeBonus >= taxLadders[i].minTax && 
      monthTaxBeforeBonus <= taxLadders[i].maxTax) {
        taxRate = taxLadders[i].taxRate
        quickDeduction = taxLadders[i].quickDeduction
        taxLadderHighLightIdx = i
        break
      }
    }
    let taxAfterBonus = taxBeforeBonus * (1 - taxRate/100.0) + quickDeduction
    this.setData({
      taxAfterBonus: taxAfterBonus,
      taxRate: taxRate,
      quickDeduction: quickDeduction,
      taxLadderHighLightIdx: taxLadderHighLightIdx,
      calculated: true
    })
  },

  inputBonus: function(event) {
    if (event.detail.value.length < 1) {
      this.setData({
        taxBeforeBonus: 0.0,
      })
    } else {
      this.setData({
        taxBeforeBonus: Number(event.detail.value),
        calculated: false
      })
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})
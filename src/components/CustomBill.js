import {
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  View,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import RenderHtml from 'react-native-render-html';
import Colors from '../utils/color';
import {connect} from 'react-redux';
import moment from 'moment';
import {heightPercentageToDP as vh} from 'react-native-responsive-screen';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Images from '../utils/images';
import CustomLoader from './CustomLoader';
import CustomHeader from './CustomHeader';

const CustomBill = props => {
  const {width} = useWindowDimensions();
  const array = props?.expense;
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const checkExpense = () => {
    let totalAmt = 0,
      incomeAmt = 0,
      expenseAmt = 0;
    props?.expense?.map(item => {
      incomeAmt = incomeAmt + item?.incomeAmount;
      expenseAmt = expenseAmt + item?.expenseAmount;
      totalAmt = incomeAmt + expenseAmt;
    });
    setIncome(incomeAmt.toFixed(2));
    setExpense(expenseAmt.toFixed(2));
    setTotal(totalAmt.toFixed(2));
  };

  const createDynamic = () => {
    var table = '';
    for (let i in array) {
      const item = array[i];
      table =
        table +
        `
      <tr>
         <td style="border-width: 1px;  position: relative; text-align: center; ; font-size:13px">${item?.expenseDate}</td>
         <td style="border-width: 1px;  position: relative; text-align: center; ; font-size:13px">${item?.description}</td>
         <td style="border-width: 1px;  position: relative; text-align: center; ; font-size:13px">${item?.category}</td>
         <td style="border-width: 1px;  position: relative; text-align: center; ; font-size:13px">${item?.incomeAmount}</td>
         <td style="border-width: 1px;  position: relative; text-align: center; ; font-size:13px">${item?.expenseAmount}</td>
      </tr>
      `;
    }
    const html = `
    <html>
    <body>
      <header>
        <h1 style="text-align:center; color:${
          Colors.black
        }">Expense Manager</h1>
        <div style=" padding:10px; height:120px">
        <div style="display:flex; flex-direction:row;">
          <p style=" bottom:10px; width:70%;">${props?.user?.name}</p>
          <span style="width:30%;"><img alt="" src=${props?.user?.image}></span>
          </div>
          <p style=" bottom:90px; width:70%;">${props?.user?.mail}</p>
          <p style=" bottom:115px; width:70%;">${props?.user?.mobile}</p>
        </div>
      </header>
      <article>
      <h3 style="text-align:center;">All Report</h3>
        <table class="meta" style="font-size: 75%; table-layout: fixed; width: 100%;border-collapse: collapse; border-spacing: 2px;">
          <tr>
            <th style="border-width: 1px; padding: 0.5em; position: relative; text-align: left;"><span contenteditable>Invoice #</span></th>
            <td style="border-width: 1px; padding: 0.5em; position: relative; text-align: left;"><span contenteditable>${Math.random()
              .toString(16)
              .slice(2)}</span></td>
          </tr>
          <tr>
            <th style="border-width: 1px; padding: 0.5em; position: relative; text-align: left;"><span contenteditable>Date</span></th>
            <td style="border-width: 1px; padding: 0.5em; position: relative; text-align: left;"><span contenteditable>${moment().format(
              'MMMM Do YYYY, h:mm:ss a',
            )}</span></td>
          </tr>
          <tr>
            <th style="border-width: 1px; padding: 0.5em; position: relative; text-align: left;"><span contenteditable>Profit</span></th>
            <td style="border-width: 1px; padding: 0.5em; position: relative; text-align: left;"><span id="prefix" contenteditable></span><span>${'\u20B9'}${
      props?.total
    }</span></td>
          </tr>
        </table>
        <table class="inventory">
          <thead>
            <tr>
              <th style="border-width: 1px; padding: 0.4em; position: relative; text-align: center; font-size:12px;"><span>Date</span></th>
              <th style="border-width: 1px; padding: 0.4em; position: relative; text-align: center; font-size:12px;"><span>Description</span></th>
              <th style="border-width: 1px; padding: 0.4em; position: relative; text-align: center; font-size:12px;"><span>Category</span></th>
              <th style="border-width: 1px; padding: 0.4em; position: relative; text-align: center; font-size:12px;"><span>Income</span></th>
              <th style="border-width: 1px; padding: 0.4em; position: relative; text-align: center; font-size:12px;"><span>Expense</span></th>
            </tr>
          </thead>
          <tbody>
          ${table}
          </tbody>
          </table>
          <table class="balance">
            <tr>
              <th style="border-width: 1px; padding: 0.5em; position: relative; text-align: left;"><span>Total Transaction</span></th>
              <td style="border-width: 1px; padding: 0.5em; position: relative; text-align: left;"><span>${'\u20B9'}${total}</span></td>
            </tr>
            <tr>
              <th style="border-width: 1px; padding: 0.5em; position: relative; text-align: left;"><span>Total Income</span></th>
              <td style="border-width: 1px; padding: 0.5em; position: relative; text-align: left;"><span>${'\u20B9'}${income}</span></td>
            </tr>
            <tr>
              <th style="border-width: 1px; padding: 0.5em; position: relative; text-align: left;"><span>Total Expense</span></th>
              <td style="border-width: 1px; padding: 0.5em; position: relative; text-align: left;"><span>${'\u20B9'}${expense}</span></td>
            </tr>
          </table>
        </article>
        <div style="width:90%; justify-content:flex-end; align-items:flex-end; margin-top:80px">
          <h3>Authorized Signature</h3>
          <h5>............................................</h5>
        </div>
      </body>
    </html>
  `;
    return html;
  };

  const createPDF = async () => {
    setIsLoading(true);
    let options = {
      html: createDynamic(),
      fileName: `Expense-Manager_${moment().date()}-${
        moment().month() + 1
      }-${moment().year()}`,
      directory: 'Documents',
      fonts: [
        '/src/assets/fonts/Roboto-Bold.ttf',
        '/src/assets/fonts/Roboto-Regular.ttf',
      ],
    };

    setTimeout(async () => {
      setIsLoading(false);
      let file = await RNHTMLtoPDF.convert(options);
      alert(file.filePath);
    }, 2000);
  };

  useEffect(() => {
    checkExpense();
  }, []);

  const source = {
    html: createDynamic(),
  };

  return (
    <>
      {isLoading ? (
        <CustomLoader isWait />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <View>
            <CustomHeader isBack />
          </View>
          <RenderHtml contentWidth={width} source={source} />
          <TouchableOpacity
            onPress={() => createPDF()}
            style={styles.pdfBtnView}>
            <Image source={Images.save_pdf} style={styles.pdfIcon} />
          </TouchableOpacity>
        </ScrollView>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  user: state.userData,
  total: state.totalAmt,
  expense: state.expenseData,
});

const styles = StyleSheet.create({
  container: {flex: 1, flexWrap: 'nowrap'},
  pdfBtnView: {
    width: '100%',
    borderRadius: 30,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    right: vh(5),
    bottom: vh(4),
    position: 'absolute',
  },
  pdfIcon: {
    height: 50,
    width: 50,
  },
});

export default connect(mapStateToProps, null)(CustomBill);

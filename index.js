function number2text(s=0, currency='USD', lang='en') {
    let th=[];
    let dg=[];
    let tn=[];
    let tw=[];
    let hundred = '';
    let only = '';
    let decimal = '';
    switch(lang) {
        case 'en':
            th = ['', ' Thousand', ' Million', ' Billion', ' Trillion', ' Quadrillion', ' Quintillion'];
            dg = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
            tn = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
            tw = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
            hundred = 'Hundred and ';
            only = ' Only';
            decimal = 'Point ';
            break;
        case 'bn':
            th = ['', ' হাজার', ' মিলিয়ন', ' বিলিয়ন', ' ট্রিলিয়ন ', ' কোয়াড্রিলিয়ন', ' কুইন্টিলিওন'];
            dg = ['শূন্য', 'এক', 'দুই', 'তিন', 'চার', 'পাঁচ', 'ছয়', 'সাত', 'আট', 'নয়'];
            tn = ['দশ', 'এগারো', 'বারো', 'তেরো', 'চৌদ্দ', 'পনের', 'ষোল', 'সতের', 'আঠার', 'উনিশ'];
            tw = ['বিশ', 'তিরিশ', 'চল্লিশ', 'পঞ্চাশ', 'ষাট', 'সত্তর', 'আশি', 'নব্বই'];
            hundred = 'শত ';
            only = ' মাত্র';
            decimal = 'দশমিক ';
            break;
        default:
            th = ['', ' Thousand', ' Million', ' Billion', ' Trillion', ' Quadrillion', ' Quintillion'];
            dg = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
            tn = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
            tw = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
            hundred = 'Hundred ';
            only = ' Only';
            decimal = 'Point ';
            break;
    }
    
    if (s == '0') {
        return 'Zero';
    }
    if (s == 0) {
        return 'Zero';
    }
    
    s = s.toString();
    s = s.replace(/[\, ]/g, '');
    if (s != parseFloat(s)) return 'not a number';
    let x = s.indexOf('.');
    if (x == -1) x = s.length;
    if (x > 15) return 'too big';
    let n = s.split('');
    let str = '';
    let sk = 0;
    for (let i = 0; i < x; i++) {
        if ((x - i) % 3 == 2) {
            if (n[i] == '1') {
                str += tn[Number(n[i + 1])] + ' ';
                i++;
                sk = 1;
            } else if (n[i] != 0) {
                str += tw[n[i] - 2] + ' ';
                sk = 1;
            }
        } else if (n[i] != 0) {
            str += dg[n[i]] + ' ';
            if ((x - i) % 3 == 0) str += hundred;
            sk = 1;
        }
        if ((x - i) % 3 == 1) {
            if (sk) str += th[(x - i - 1) / 3] + ' ';
            sk = 0;
        }
    }
    if (x != s.length) {
        let y = s.length;
        str += decimal;
        for (let i = x + 1; i < y; i++) str += dg[n[i]] + ' ';
    }
    return str.replace(/\s+/g, ' ')+currency+only;
}

module.exports = { number2text };
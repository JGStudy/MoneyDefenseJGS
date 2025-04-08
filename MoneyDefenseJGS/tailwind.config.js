import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // 다크모드: body에 class="dark"로 적용
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // KB Yellow & Gray
        kbYellowPositive: '#F9C600',
        kbYellow: '#F7D338',
        kbYellowNative: '#FFCC00',
        kbGray: '#6D5A4C',
        kbGrayAlt: '#918E84',

        // UI Grayscale
        kbUi01: '#000000',
        kbUi02: '#202122',
        kbUi03: '#404B51',
        kbUi04: '#606E76',
        kbUi05: '#848B91',
        kbUi06: '#A8A8A8',
        kbUi07: '#C8CCD0',
        kbUi08: '#DDE1E4',
        kbUi09: '#EBEEF0',
        kbUi10: '#F7F7F8',
        kbUi11: '#FFFFFF',

        // 상태 색상
        statusPositive: '#529EFF',
        statusError: '#F25252',
        statusErrorInput: '#F98585',
        statusCaution: '#F7D338',

        // 지갑색상
        kbBlueGray: '#3796C6',
        kbPointBlue: '#2C44C2',
        kbMultiSky: '#92D3F8',
        kbMultiBlue: '#57D9FD',
        kbMultiGreen: '#3FD3B8',
        kbSkyBlue: '#C6E9F0',
      },
      fontSize: {
        // 타이틀 계열
        'page-title': ['28px', { lineHeight: '39px', letterSpacing: '-0.2px' }],
        'complete-title': ['24px', { lineHeight: '33px', letterSpacing: '-0.2px' }],
        'popup-title': ['20px', { lineHeight: '28px', letterSpacing: '-0.2px' }],
        'section-title': ['18px', { lineHeight: '25px', letterSpacing: '-0.2px' }],

        // 바디 계열
        body01: ['18px', { lineHeight: '25px', letterSpacing: '-0.2px' }],
        body02: ['16px', { lineHeight: '23px', letterSpacing: '-0.2px' }],
        'guide-copy': ['15px', { lineHeight: '21px', letterSpacing: '-0.2px' }],
        body03: ['14px', { lineHeight: '20px', letterSpacing: '-0.1px' }],
        caption: ['14px', { lineHeight: '20px', letterSpacing: '-0.1px' }],
        'table-caption': ['13px', { lineHeight: '18px', letterSpacing: '-0.1px' }],

        // 숫자 표시
        'number-lg': ['19px', { lineHeight: '25px', letterSpacing: '-0.2px' }],
        'number-md': ['17px', { lineHeight: '23px', letterSpacing: '-0.2px' }],
        'number-sm': ['15px', { lineHeight: '20px', letterSpacing: '-0.1px' }],

        // 입력 필드
        'input-text': ['19px', { letterSpacing: '-0.1px' }],
        'input-label': ['16px', { letterSpacing: '0px' }],

        // 버튼
        'btn-lg': ['20px', { letterSpacing: '-0.2px' }],
        'btn-md': ['16px', { letterSpacing: '-0.2px' }],
        'btn-text-md': ['15px', { letterSpacing: '-0.1px' }],
        'btn-text-sm': ['14px', { letterSpacing: '-0.1px' }],
      },
    },
  },
  plugins: [],
}

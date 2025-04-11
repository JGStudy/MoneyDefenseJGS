import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // 다크모드: body에 class="dark"로 적용
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', ...defaultTheme.fontFamily.sans],
        nums: ['Roboto', 'sans-serif'],
      },
      colors: {
        // KB Colors
        'kb-yellow-positive': '#FFBC00',
        'kb-yellow-native': '#FFCC00',
        'kb-yellow': '#FFD338',
        'kb-gray': '#60584C',
        'kb-gray-alt': '#918274',

        // UI Grayscale
        'kb-ui-01': '#000000',
        'kb-ui-02': '#26282C',
        'kb-ui-03': '#484B51',
        'kb-ui-04': '#696E76',
        'kb-ui-05': '#8C949E',
        'kb-ui-06': '#AAB0B8',
        'kb-ui-07': '#C6CBD0',
        'kb-ui-08': '#DDE1E4',
        'kb-ui-09': '#EBEEF0',
        'kb-ui-10': '#F7F7F8',
        'kb-ui-11': '#FFFFFF',

        // Status Colors
        'status-positive': '#287EFF',
        'status-error': '#F23F3F',
        'status-error-input': '#FF5858',
        'status-caution': '#FFD338',
        'status-font-error': '#EC645E',
        //다크 모드
        'kb-dark-bg': '#F5F5F7', // 전체 배경 (밝은 회색)
        'kb-dark-card': '#FFFFFF', // 카드 배경 (화이트)
        'kb-dark-line': '#E0E0E0', // 라인 / 테두리
        'kb-dark-muted': '#8C949E', // 비활성 텍스트
        'kb-dark-text': '#2E3148', // 메인 텍스트
        'kb-dark-accent': '#FFD338', // 포인트 (KB 노랑)

        // 포인트 컬러도 필요 시 유지
        'kb-point-blue': '#3E4CCA',
        'kb-main-sky': '#62B2EA',
        'kb-main-blue': '#3172DC',
        'kb-main-green': '#52AD8A',
        'kb-skyblue': '#C3DDFD',
      },
      fontSize: {
        // title
        title01: ['28px', { lineHeight: '39px', letterSpacing: '-0.2px' }],
        title02: ['24px', { lineHeight: '33px', letterSpacing: '-0.2px' }],
        title03: ['20px', { lineHeight: '28px', letterSpacing: '-0.2px' }],

        // body
        body01: ['18px', { lineHeight: '25px', letterSpacing: '-0.2px' }],
        body02: ['16px', { lineHeight: '23px', letterSpacing: '-0.2px' }],
        body03: ['14px', { lineHeight: '20px', letterSpacing: '-0.1px' }],
        'guide-notice': ['15px', { lineHeight: '21px', letterSpacing: '-0.2px' }],
        'table-caption': ['13px', { lineHeight: '18px', letterSpacing: '-0.1px' }],

        // num(font-family: Roboto)
        'number-lg': ['19px', { lineHeight: '25px', letterSpacing: '-0.2px' }],
        'number-md': ['17px', { lineHeight: '23px', letterSpacing: '-0.2px' }],
        'number-sm': ['15px', { lineHeight: '20px', letterSpacing: '-0.1px' }],
      },
      boxShadow: {
        // effect style
        list: '0px 4px 20px rgba(65, 66, 77, 0.22)',
        card: '0px 4px 6px rgba(0, 0, 0, 0.07)',
        module: '0px 0px 12px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}

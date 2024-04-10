

export default {
  logo: <div style={{ display: 'flex', alignItems: 'center' }}>
    <span style={{ marginRight: '10px' }}>
      <img src="/logo-simple.png" alt="Protofy" width="40" height="40" />
    </span>
    <span style={{ fontWeight: 'bold', fontSize: '18px', opacity:0.8}}>Iridium Hydroponics</span>
  </div>,
  project: {
    link: 'https://github.com/Protofy-xyz/iridium-hydroponics'
  },
  docsRepositoryBase: 'https://github.com/Protofy-xyz/iridium-hydroponics/tree/main/apps/nextra',
  footer: {
    text: (
      <span>
        {new Date().getFullYear()} ©{' '}
        {/* <a href="https://protofy.xyz" target="_blank"> */}
          Iridium Hydroponics
        {/* </a> */}
      </span>
    )
  }
  // ... other theme options
}
import 'rsuite/lib/styles/index.less';
import { Nav, Navbar, Icon } from 'rsuite';
import Link from 'next/link';

function NavigationHeader() {
  return (
    <>
      <Navbar appearance='inverse'>
        <Navbar.Header>
          <Link href='/'>
            <a className='navbar-brand logo'>SCORE BOARD</a>
          </Link>
        </Navbar.Header>
        <Navbar.Body>
          <Nav pullRight>
            <Nav.Item
              renderItem={(item) => {
                return <Link href='/new-player'>{item}</Link>;
              }}
              icon={<Icon icon='user' />}
            >
              New player
            </Nav.Item>
          </Nav>
        </Navbar.Body>
      </Navbar>

      <style jsx>
        {`
          .navbar-brand {
            padding: 18px 20px;
            display: inline-block;
          }
        `}
      </style>
    </>
  );
}

export default NavigationHeader;

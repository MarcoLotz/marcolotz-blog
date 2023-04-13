import { useState } from 'react';
import {
  Container,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
  Title,
  Paper,
  Avatar,
  UnstyledButton,
  Button,
  Anchor,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Router from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { IconChevronDown, IconFilePlus, IconLogout } from '@tabler/icons-react';
import styles from './index.module.scss';
import { useEditPost } from '@/hooks/useEdit';

const Header = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('Home');
  const { authData, signOut } = useAuth();
  const { setEditPost } = useEditPost();

  const handlePush = (route: string) => {
    Router.push(route);
    toggle();
  };

  const tabs =
    <Tabs.List>
      <Tabs.Tab value="Home" onClick={() => handlePush('/')}>
        Home
      </Tabs.Tab>
      <Tabs.Tab value="About" onClick={() => handlePush('/about')}>
        About
      </Tabs.Tab>
      <Anchor role='tab' href='https://github.com/marcolotz' target='_blank' rel='noopener noreferrer'>
        <Tabs.Tab value="Github">
          Github
        </Tabs.Tab>
      </Anchor>
      <Tabs.Tab value="Contact" onClick={() => handlePush('/contact')}>
        Contact
      </Tabs.Tab>
    </Tabs.List>;

  return (
    <div style={{ position: 'relative' }} className={styles.header}>
      <Container className={styles.mainSection}>
        <Group position="apart">
          <div>
            <Title size={45}>Marco Aurelio Lotz</Title>
            <Text className={styles.subtitle} size={15}>Thoughts about Big Data and Embedded Systems</Text>
          </div>

          <Burger opened={opened} onClick={toggle} className={styles.burger} size="sm" aria-label="Marco Lotz website menu" />
          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >

            <Menu.Target >
              <UnstyledButton
                sx={{ display: authData.signedIn ? 'box' : 'none' }}
                data-active={userMenuOpened}
              >
                <Group spacing={7}>
                  <Avatar src="https://github.com/marcolotz.png" alt={authData.name} radius="xl" size={20} />
                  <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                    {authData.name}
                  </Text>
                  <IconChevronDown size={rem(12)} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Settings</Menu.Label>
              <Menu.Item
                onClick={() =>{
                  Router.push('/admin/newPost');
                  setEditPost(null);
                }}
                icon={<IconFilePlus size="1.3rem" stroke={1.5} />}>
                New Post
              </Menu.Item>

              <Menu.Item
                onClick={() => signOut()}
                icon={<IconLogout size="1.3rem" stroke={1.5} />}>
                Logout
              </Menu.Item>

              <Menu.Divider />

            </Menu.Dropdown>
          </Menu>

          {!authData.signedIn &&
            <Button
              variant="outline"
              className={styles.signinButton}
              // color='green'
              onClick={() => Router.push('/admin')}>
              Sign In
            </Button>}
        </Group>
      </Container>
      <Container>
        <Tabs
          defaultValue="Home"
          variant="outline"
          classNames={{
            root: styles.tabs,
            tabsList: styles.tabsList,
            tab: styles.tab,
          }}
          value={activeTab}
          onTabChange={(value) => value !== 'Github' && setActiveTab(value || 'Home')}
        >
          {tabs}
        </Tabs>
      </Container>
      {opened && <Paper className={styles.dropdown} withBorder>
        <Tabs className={styles.dropdownTabs}>
          {tabs}
        </Tabs>
      </Paper>}
    </div>
  );
}

export default Header;

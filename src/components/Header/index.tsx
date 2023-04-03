import { useState } from 'react';
import {
  createStyles,
  Container,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
  Title,
  Transition,
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

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
      }`,
    marginBottom: rem(20),

    'a:hover': {
      textDecoration: 'none',
      color: 'none',
      cursor: 'unset',
    },
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
    zIndex: 10
  },

  userActive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  tabs: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  tabsList: {
    borderBottom: '0 !important',
    gap: '0.5rem',
  },

  tab: {
    fontWeight: 600,
    height: rem(38),
    backgroundColor: '#79b458',
    color: 'white',

    '&:hover': {
      backgroundColor: '#79b458a0',
    },

    '&[data-active]': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
      color: '#79b458'
    },
  },

  dropdown: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 2,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
    border: '1x solid black'

  },

  dropdownTabs: {
    '.mantine-Tabs-tabsList': {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    '.mantine-Tabs-tab': {
      width: '100%',
      fontSize: '1.3rem',
      color: '#000000b3',
    }
  }
}));

const Header = () => {
  const { classes, cx } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('Home');
  const { authData, signOut } = useAuth();

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
      <Anchor href='https://github.com/marcolotz' target='_blank' rel='noopener noreferrer'>
        <Tabs.Tab value="Github">
          Github
        </Tabs.Tab>
      </Anchor>
      <Tabs.Tab value="Contact" onClick={() => handlePush('/contact')}>
        Contact
      </Tabs.Tab>
    </Tabs.List>;

  return (
    <div style={{ position: 'relative' }} className={classes.header}>
      <Container className={classes.mainSection}>
        <Group position="apart">
          <div>
            <Title size={45}>Marco Aurelio Lotz</Title>
            <Text color="gray" size={15}>Thoughts about Big Data and Embedded Systems</Text>
          </div>

          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
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
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
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
                onClick={() => Router.push('/admin/newPost')}
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
              color='green'
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
            root: classes.tabs,
            tabsList: classes.tabsList,
            tab: classes.tab,
          }}
          value={activeTab}
          onTabChange={(value) => value !== 'Github' && setActiveTab(value || 'Home')}
        >
          {tabs}
        </Tabs>
      </Container>
      <Transition transition="pop-top-right" duration={200} mounted={opened}>
        {(styles) => (
          <Paper className={classes.dropdown} withBorder style={styles}>
            <Tabs className={classes.dropdownTabs}>
              {tabs}
            </Tabs>
          </Paper>
        )}
      </Transition>
    </div>
  );
}

export default Header;

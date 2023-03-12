import { useState } from 'react';
import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Router from 'next/router';
import {
  IconLogout,
  IconChevronDown,
  IconFilePlus,
} from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
      }`,
    marginBottom: rem(20),
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
}));

interface HeaderTabsProps {
  user: { name: string; image: string };
}

const Header = ({ user }: HeaderTabsProps) => {
  const { classes, cx } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('Home');

  return (
    <div className={classes.header}>
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
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
              >
                <Group spacing={7}>
                  <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
                  <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                    {user.name}
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

              <Menu.Item icon={<IconLogout size="1.3rem" stroke={1.5} />}>Logout</Menu.Item>

              <Menu.Divider />

            </Menu.Dropdown>
          </Menu>
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
          <Tabs.List>
            <Tabs.Tab value="Home" onClick={() => Router.push('/')}>
              Home
            </Tabs.Tab>
            <Tabs.Tab value="About" onClick={() => Router.push('/about')}>
              About
            </Tabs.Tab>
            <Tabs.Tab value="Github" onClick={() => window.open('https://github.com/marcolotz')}>
              Github
            </Tabs.Tab>
            <Tabs.Tab value="Contact" onClick={() => Router.push('/contact')}>
              Contact
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </Container>
    </div>
  );
}

export default Header;

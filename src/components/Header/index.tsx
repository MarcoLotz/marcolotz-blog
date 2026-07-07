import { Burger, Container, Group, Paper, Tabs, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/router';
import styles from './index.module.css';

interface NavTab {
  value: string;
  label: string;
  href: string;
  external?: boolean;
}

const NAV_TABS: NavTab[] = [
  { value: 'home', label: 'Home', href: '/' },
  { value: 'about', label: 'About', href: '/about' },
  { value: 'github', label: 'Github', href: 'https://github.com/marcolotz', external: true },
  { value: 'contact', label: 'Contact', href: '/contact' },
];

const TAB_BY_ROUTE: Record<string, string> = {
  '/': 'home',
  '/about': 'about',
  '/contact': 'contact',
};

const Header = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const router = useRouter();
  const activeTab = TAB_BY_ROUTE[router.pathname] ?? 'home';

  const openTab = (tab: NavTab) => {
    if (tab.external) {
      window.open(tab.href, '_blank', 'noopener,noreferrer');
    } else {
      void router.push(tab.href);
    }
    close();
  };

  const tabList = (
    <Tabs.List>
      {NAV_TABS.map((tab) => (
        <Tabs.Tab key={tab.value} value={tab.value} onClick={() => openTab(tab)}>
          {tab.label}
        </Tabs.Tab>
      ))}
    </Tabs.List>
  );

  return (
    <header className={styles.header}>
      <Container className={styles.mainSection}>
        <Group justify="space-between">
          <div>
            <Title size={45}>Marco Aurelio Lotz</Title>
            <Text className={styles.subtitle} fz={15}>
              Thoughts about Big Data and Embedded Systems
            </Text>
          </div>
          <Burger
            opened={opened}
            onClick={toggle}
            className={styles.burger}
            size="sm"
            aria-label="Marco Lotz website menu"
          />
        </Group>
      </Container>
      <Container>
        <Tabs
          variant="outline"
          value={activeTab}
          classNames={{
            root: styles.tabs,
            list: styles.tabsList,
            tab: styles.tab,
          }}
        >
          {tabList}
        </Tabs>
      </Container>
      {opened && (
        <Paper className={styles.dropdown} withBorder>
          <Tabs value={activeTab} className={styles.dropdownTabs}>
            {tabList}
          </Tabs>
        </Paper>
      )}
    </header>
  );
};

export default Header;

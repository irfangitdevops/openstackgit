import { devopsCatalog } from "./devopsCatalog";

/** A single copyable terminal/code block within a guide section. */
export type GuideCode = { label?: string; code: string };

/** One content block of an install guide. */
export type GuideSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  code?: GuideCode[];
  /** Highlighted callout rendered below the section body. */
  note?: string;
};

export type GuideLink = { label: string; url: string };

export type InstallGuide = {
  /** Unique blog slug (flat namespace — usually equals the tool slug). */
  slug: string;
  toolName: string;
  /** Catalog category slug, used for the breadcrumb + download back-link. */
  categorySlug: string;
  /** Tool slug within its download category. */
  toolSlug: string;
  headline: string;
  summary: string;
  updated: string;
  /** Prerendered at build time; the rest render on-demand via ISR. */
  featured?: boolean;
  prerequisites?: string[];
  sections: GuideSection[];
  /** Official documentation. */
  docs: GuideLink;
  /** Knowledge base / community resource. */
  kb: GuideLink;
  /** Slugs of related guides. */
  related?: string[];
};

export const installGuides: InstallGuide[] = [
  // ===================================================================
  // IaaS / Self-Hosted Cloud
  // ===================================================================
  {
    slug: "openstack",
    toolName: "OpenStack",
    categorySlug: "iaas",
    toolSlug: "openstack",
    headline: "How to Install & Set Up OpenStack",
    summary:
      "Stand up your own private cloud with OpenStack — an all-in-one lab with DevStack, or a production deployment with Kolla-Ansible.",
    updated: "2026",
    featured: true,
    prerequisites: [
      "A dedicated Linux host (Ubuntu 22.04/24.04 LTS or CentOS Stream recommended)",
      "At least 8 GB RAM and 2 vCPUs for an all-in-one lab (16 GB+ for anything real)",
      "A non-root user with sudo privileges and outbound internet access",
    ],
    sections: [
      {
        heading: "What is OpenStack?",
        paragraphs: [
          "OpenStack is the de-facto open source Infrastructure-as-a-Service platform. It exposes compute (Nova), networking (Neutron), block/object storage (Cinder/Swift), identity (Keystone), and an image service (Glance) through a unified API and dashboard (Horizon).",
          "For a first install, use DevStack on a throwaway VM. For production, Kolla-Ansible deploys every service as a container and is the most widely used method.",
        ],
      },
      {
        heading: "Option A — All-in-one lab with DevStack",
        paragraphs: [
          "DevStack builds a complete single-node cloud from source. Run it as a dedicated stack user, never as root.",
        ],
        code: [
          {
            label: "create the stack user",
            code: `sudo useradd -s /bin/bash -d /opt/stack -m stack
sudo chmod +x /opt/stack
echo "stack ALL=(ALL) NOPASSWD: ALL" | sudo tee /etc/sudoers.d/stack
sudo -u stack -i`,
          },
          {
            label: "clone DevStack and configure",
            code: `git clone https://opendev.org/openstack/devstack
cd devstack
cat > local.conf <<'EOF'
[[local|localrc]]
ADMIN_PASSWORD=secret
DATABASE_PASSWORD=$ADMIN_PASSWORD
RABBIT_PASSWORD=$ADMIN_PASSWORD
SERVICE_PASSWORD=$ADMIN_PASSWORD
EOF`,
          },
          {
            label: "deploy (10–25 minutes)",
            code: `./stack.sh`,
          },
        ],
        note: "DevStack is for development and testing only — it is not upgradeable and should never run on a machine you care about.",
      },
      {
        heading: "Option B — Production with Kolla-Ansible",
        paragraphs: [
          "Kolla-Ansible runs each OpenStack service in a Docker container and orchestrates the deployment with Ansible.",
        ],
        code: [
          {
            label: "install Kolla-Ansible in a virtualenv",
            code: `python3 -m venv /opt/kolla
source /opt/kolla/bin/activate
pip install -U pip
pip install 'ansible-core>=2.16,<2.18'
pip install git+https://opendev.org/openstack/kolla-ansible@stable/2024.2`,
          },
          {
            label: "bootstrap and deploy",
            code: `kolla-ansible install-deps
sudo mkdir -p /etc/kolla
cp -r /opt/kolla/share/kolla-ansible/etc_examples/kolla/* /etc/kolla
# edit /etc/kolla/globals.yml, then:
kolla-genpwd
kolla-ansible bootstrap-servers -i ./inventory
kolla-ansible deploy -i ./inventory`,
          },
        ],
      },
      {
        heading: "Verify the installation",
        code: [
          {
            code: `source openrc admin admin
openstack service list
openstack endpoint list
openstack server list`,
          },
        ],
        paragraphs: [
          "The Horizon dashboard is reachable at the host IP once services report as up.",
        ],
      },
    ],
    docs: { label: "OpenStack Documentation", url: "https://docs.openstack.org/" },
    kb: { label: "OpenStack Community & Mailing Lists", url: "https://www.openstack.org/community/" },
    related: ["proxmox-ve", "cloudstack", "kubernetes"],
  },
  {
    slug: "proxmox-ve",
    toolName: "Proxmox VE",
    categorySlug: "iaas",
    toolSlug: "proxmox-ve",
    headline: "How to Install & Set Up Proxmox VE",
    summary:
      "Deploy the Proxmox Virtual Environment — KVM virtual machines and LXC containers with a built-in web UI — from the ISO or on top of Debian.",
    updated: "2026",
    prerequisites: [
      "A 64-bit host with a CPU that supports Intel VT-x / AMD-V virtualization",
      "At least 2 GB RAM (much more for real workloads) and a dedicated disk",
      "Debian 12 (Bookworm) if installing on top of an existing OS",
    ],
    sections: [
      {
        heading: "Option A — Bare-metal ISO installer (recommended)",
        paragraphs: [
          "Download the Proxmox VE ISO, write it to a USB stick, boot the target machine from it, and follow the graphical installer. This gives you a purpose-built hypervisor with ZFS support out of the box.",
        ],
        bullets: [
          "Write the ISO with balenaEtcher, Rufus (DD mode), or dd on Linux.",
          "Choose the target disk, timezone, and a management IP during setup.",
          "After reboot, the web UI is available on port 8006.",
        ],
      },
      {
        heading: "Option B — Install on top of Debian 12",
        code: [
          {
            label: "add the Proxmox no-subscription repo",
            code: `echo "deb [arch=amd64] http://download.proxmox.com/debian/pve bookworm pve-no-subscription" | sudo tee /etc/apt/sources.list.d/pve-install-repo.list
wget https://enterprise.proxmox.com/debian/proxmox-release-bookworm.gpg -O /etc/apt/trusted.gpg.d/proxmox-release-bookworm.gpg`,
          },
          {
            label: "install the packages",
            code: `sudo apt update && sudo apt full-upgrade -y
sudo apt install -y proxmox-ve postfix open-iscsi
sudo reboot`,
          },
        ],
      },
      {
        heading: "Verify the installation",
        paragraphs: [
          "Browse to https://your-server-ip:8006 and log in as root with the system password. On the CLI:",
        ],
        code: [{ code: `pveversion` }],
      },
    ],
    docs: { label: "Proxmox VE Documentation", url: "https://pve.proxmox.com/pve-docs/" },
    kb: { label: "Proxmox Wiki & Community Forum", url: "https://pve.proxmox.com/wiki/Main_Page" },
    related: ["openstack", "opennebula", "docker-engine"],
  },
  {
    slug: "cloudstack",
    toolName: "Apache CloudStack",
    categorySlug: "iaas",
    toolSlug: "cloudstack",
    headline: "How to Install & Set Up Apache CloudStack",
    summary:
      "Install the CloudStack management server for turnkey, AWS-API-compatible IaaS orchestration on Ubuntu.",
    updated: "2026",
    prerequisites: [
      "Ubuntu 22.04 LTS management host with a static IP",
      "MySQL/MariaDB (installed below) and NFS for primary/secondary storage",
      "A separate hypervisor host (KVM) for running instances in production",
    ],
    sections: [
      {
        heading: "Add the CloudStack package repository",
        code: [
          {
            code: `sudo mkdir -p /etc/apt/keyrings
wget -O- http://download.cloudstack.org/release.asc | gpg --dearmor | sudo tee /etc/apt/keyrings/cloudstack.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/cloudstack.gpg] http://download.cloudstack.org/ubuntu jammy 4.19" | sudo tee /etc/apt/sources.list.d/cloudstack.list
sudo apt-get update`,
          },
        ],
      },
      {
        heading: "Install the management server and database",
        code: [
          {
            code: `sudo apt-get install -y cloudstack-management mysql-server
sudo cloudstack-setup-databases cloud:password@localhost --deploy-as=root
sudo cloudstack-setup-management`,
          },
        ],
      },
      {
        heading: "Verify the installation",
        paragraphs: [
          "Once the management server is up, open http://your-server-ip:8080/client and sign in with the default admin / password credentials, then complete the setup wizard.",
        ],
        code: [{ code: `sudo systemctl status cloudstack-management` }],
      },
    ],
    docs: { label: "CloudStack Installation Docs", url: "https://docs.cloudstack.apache.org/" },
    kb: { label: "CloudStack Mailing Lists & Wiki", url: "https://cloudstack.apache.org/mailing-lists.html" },
    related: ["openstack", "opennebula", "foreman"],
  },
  {
    slug: "opennebula",
    toolName: "OpenNebula",
    categorySlug: "iaas",
    toolSlug: "opennebula",
    headline: "How to Install & Set Up OpenNebula",
    summary:
      "Bring up an OpenNebula cloud and edge management front-end — the fastest path is the one-command minione evaluation installer.",
    updated: "2026",
    prerequisites: [
      "Ubuntu 22.04 / RHEL-family front-end host",
      "KVM-capable hardware for the hypervisor nodes",
      "Root or sudo access",
    ],
    sections: [
      {
        heading: "Option A — Quick evaluation with minione",
        paragraphs: [
          "minione deploys a fully working single-node OpenNebula (front-end + KVM) in a few minutes — ideal for a first look.",
        ],
        code: [
          {
            code: `wget https://raw.githubusercontent.com/OpenNebula/minione/master/minione
sudo bash minione`,
          },
        ],
      },
      {
        heading: "Option B — Repository install (front-end)",
        code: [
          {
            code: `wget -q -O- https://downloads.opennebula.io/repo/repo2.key | gpg --dearmor | sudo tee /etc/apt/keyrings/opennebula.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/opennebula.gpg] https://downloads.opennebula.io/repo/6.10/Ubuntu/22.04 stable opennebula" | sudo tee /etc/apt/sources.list.d/opennebula.list
sudo apt update
sudo apt install -y opennebula opennebula-sunstone opennebula-fireedge opennebula-gate opennebula-flow`,
          },
        ],
      },
      {
        heading: "Verify the installation",
        paragraphs: [
          "The Sunstone web UI listens on port 9869. On the CLI, confirm the daemon is answering:",
        ],
        code: [{ code: `oneuser show` }],
      },
    ],
    docs: { label: "OpenNebula Documentation", url: "https://docs.opennebula.io/" },
    kb: { label: "OpenNebula Community Forum", url: "https://forum.opennebula.io/" },
    related: ["openstack", "cloudstack", "proxmox-ve"],
  },
  {
    slug: "foreman",
    toolName: "Foreman",
    categorySlug: "iaas",
    toolSlug: "foreman",
    headline: "How to Install & Set Up Foreman",
    summary:
      "Install Foreman for full lifecycle management — provisioning, configuration, and monitoring — of physical and virtual servers.",
    updated: "2026",
    prerequisites: [
      "A dedicated host with a resolvable FQDN (Foreman is picky about DNS)",
      "Ubuntu 22.04 or Enterprise Linux 8/9, 4 GB+ RAM",
      "Ports 80/443 and provisioning ports open",
    ],
    sections: [
      {
        heading: "Add the repositories",
        code: [
          {
            code: `echo "deb http://deb.theforeman.org/ jammy 3.12" | sudo tee /etc/apt/sources.list.d/foreman.list
echo "deb http://deb.theforeman.org/ plugins 3.12" | sudo tee -a /etc/apt/sources.list.d/foreman.list
wget -q https://deb.theforeman.org/foreman.asc -O- | sudo apt-key add -
sudo apt update`,
          },
        ],
      },
      {
        heading: "Run the installer",
        paragraphs: [
          "The foreman-installer is a Puppet-based wrapper that configures Foreman, its proxy, and dependencies in one shot.",
        ],
        code: [
          {
            code: `sudo apt install -y foreman-installer
sudo foreman-installer`,
          },
        ],
        note: "The installer prints the initial admin username and password at the end — copy them before clearing your terminal.",
      },
      {
        heading: "Verify the installation",
        paragraphs: [
          "Browse to https://your-fqdn and log in with the credentials from the installer output.",
        ],
      },
    ],
    docs: { label: "Foreman Manual", url: "https://docs.theforeman.org/" },
    kb: { label: "Foreman Community", url: "https://community.theforeman.org/" },
    related: ["ansible", "puppet", "cloudstack"],
  },

  // ===================================================================
  // Infrastructure as Code
  // ===================================================================
  {
    slug: "opentofu",
    toolName: "OpenTofu",
    categorySlug: "infrastructure-as-code",
    toolSlug: "opentofu",
    headline: "How to Install & Set Up OpenTofu",
    summary:
      "Install OpenTofu — the community-driven, fully open source fork of Terraform — and apply your first configuration.",
    updated: "2026",
    featured: true,
    prerequisites: [
      "A Linux, macOS, or Windows machine",
      "Credentials for the cloud/provider you plan to manage",
    ],
    sections: [
      {
        heading: "Install with the official script (Linux)",
        code: [
          {
            code: `curl --proto '=https' --tlsv1.2 -fsSL https://get.opentofu.org/install-opentofu.sh -o install-opentofu.sh
chmod +x install-opentofu.sh
./install-opentofu.sh --install-method standalone
rm -f install-opentofu.sh`,
          },
        ],
      },
      {
        heading: "Install with a package manager",
        code: [
          { label: "macOS (Homebrew)", code: `brew install opentofu` },
          { label: "Windows (Chocolatey)", code: `choco install opentofu` },
        ],
      },
      {
        heading: "Verify the installation",
        code: [{ code: `tofu --version` }],
      },
      {
        heading: "Your first configuration",
        paragraphs: ["Create a main.tf, then initialize and apply it. OpenTofu is a drop-in replacement — the CLI is tofu instead of terraform."],
        code: [
          {
            code: `tofu init
tofu plan
tofu apply`,
          },
        ],
      },
    ],
    docs: { label: "OpenTofu Documentation", url: "https://opentofu.org/docs/" },
    kb: { label: "OpenTofu GitHub Discussions", url: "https://github.com/opentofu/opentofu/discussions" },
    related: ["terraform", "pulumi", "crossplane"],
  },
  {
    slug: "terraform",
    toolName: "Terraform",
    categorySlug: "infrastructure-as-code",
    toolSlug: "terraform",
    headline: "How to Install & Set Up Terraform",
    summary:
      "Install HashiCorp Terraform from the official APT/Homebrew repositories and provision your first resources.",
    updated: "2026",
    prerequisites: [
      "Linux, macOS, or Windows",
      "A cloud provider account (AWS, Azure, GCP, etc.) with credentials configured",
    ],
    sections: [
      {
        heading: "Install on Ubuntu/Debian (HashiCorp APT repo)",
        code: [
          {
            code: `wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform`,
          },
        ],
      },
      {
        heading: "Install with a package manager",
        code: [
          { label: "macOS (Homebrew)", code: `brew tap hashicorp/tap
brew install hashicorp/tap/terraform` },
          { label: "Windows (Chocolatey)", code: `choco install terraform` },
        ],
      },
      {
        heading: "Verify the installation",
        code: [{ code: `terraform -version` }],
      },
      {
        heading: "Your first configuration",
        code: [
          {
            code: `terraform init
terraform plan
terraform apply`,
          },
        ],
        note: "Terraform is licensed under the BUSL as of v1.6. If you need a fully open source, OSI-approved alternative, see the OpenTofu guide.",
      },
    ],
    docs: { label: "Terraform Documentation", url: "https://developer.hashicorp.com/terraform/docs" },
    kb: { label: "HashiCorp Discuss — Terraform", url: "https://discuss.hashicorp.com/c/terraform-core/27" },
    related: ["opentofu", "pulumi", "vault"],
  },
  {
    slug: "pulumi",
    toolName: "Pulumi",
    categorySlug: "infrastructure-as-code",
    toolSlug: "pulumi",
    headline: "How to Install & Set Up Pulumi",
    summary:
      "Install Pulumi and define infrastructure with real programming languages — TypeScript, Python, Go, or .NET.",
    updated: "2026",
    prerequisites: [
      "A language runtime you want to use (Node.js, Python, Go, or .NET)",
      "A Pulumi Cloud account or a self-managed state backend",
    ],
    sections: [
      {
        heading: "Install the Pulumi CLI",
        code: [
          { label: "Linux / macOS", code: `curl -fsSL https://get.pulumi.com | sh` },
          { label: "macOS (Homebrew)", code: `brew install pulumi/tap/pulumi` },
          { label: "Windows (Chocolatey)", code: `choco install pulumi` },
        ],
      },
      {
        heading: "Verify the installation",
        code: [{ code: `pulumi version` }],
      },
      {
        heading: "Create your first project",
        code: [
          {
            code: `mkdir my-infra && cd my-infra
pulumi new typescript
pulumi up`,
          },
        ],
      },
    ],
    docs: { label: "Pulumi Documentation", url: "https://www.pulumi.com/docs/" },
    kb: { label: "Pulumi Community & Support", url: "https://www.pulumi.com/support/" },
    related: ["opentofu", "terraform", "crossplane"],
  },
  {
    slug: "crossplane",
    toolName: "Crossplane",
    categorySlug: "infrastructure-as-code",
    toolSlug: "crossplane",
    headline: "How to Install & Set Up Crossplane",
    summary:
      "Install Crossplane into a Kubernetes cluster to provision and manage cloud infrastructure declaratively from the Kubernetes API.",
    updated: "2026",
    prerequisites: [
      "A running Kubernetes cluster (v1.25+) and kubectl configured",
      "Helm 3 installed",
    ],
    sections: [
      {
        heading: "Install Crossplane with Helm",
        code: [
          {
            code: `helm repo add crossplane-stable https://charts.crossplane.io/stable
helm repo update
helm install crossplane \\
  --namespace crossplane-system --create-namespace \\
  crossplane-stable/crossplane`,
          },
        ],
      },
      {
        heading: "Verify the installation",
        code: [{ code: `kubectl get pods -n crossplane-system` }],
      },
      {
        heading: "Install the Crossplane CLI",
        paragraphs: ["The kubectl crossplane plugin helps you build and push configuration packages."],
        code: [
          {
            code: `curl -sL https://raw.githubusercontent.com/crossplane/crossplane/master/install.sh | sh
sudo mv crossplane /usr/local/bin`,
          },
        ],
      },
    ],
    docs: { label: "Crossplane Documentation", url: "https://docs.crossplane.io/" },
    kb: { label: "Crossplane Knowledge Base", url: "https://docs.crossplane.io/knowledge-base/" },
    related: ["kubernetes", "opentofu", "argo-cd"],
  },

  // ===================================================================
  // Configuration Management
  // ===================================================================
  {
    slug: "ansible",
    toolName: "Ansible",
    categorySlug: "configuration-management",
    toolSlug: "ansible",
    headline: "How to Install & Set Up Ansible",
    summary:
      "Install Ansible — agentless automation for provisioning, configuration management, and app deployment — and run your first playbook.",
    updated: "2026",
    featured: true,
    prerequisites: [
      "A Linux/macOS control node with Python 3.9+",
      "SSH access to the machines you want to manage (no agent required on them)",
    ],
    sections: [
      {
        heading: "Install with pip (recommended)",
        code: [{ code: `python3 -m pip install --user ansible` }],
      },
      {
        heading: "Install from your distribution",
        code: [
          { label: "Ubuntu (PPA)", code: `sudo apt update
sudo apt install -y software-properties-common
sudo add-apt-repository --yes --update ppa:ansible/ansible
sudo apt install -y ansible` },
          { label: "macOS (Homebrew)", code: `brew install ansible` },
        ],
      },
      {
        heading: "Verify the installation",
        code: [{ code: `ansible --version` }],
      },
      {
        heading: "Your first ad-hoc command and playbook",
        paragraphs: ["Create an inventory file listing your hosts, then ping them and run a playbook."],
        code: [
          {
            label: "inventory.ini",
            code: `[web]
192.0.2.10
192.0.2.11`,
          },
          {
            label: "test connectivity + run a playbook",
            code: `ansible -i inventory.ini web -m ping
ansible-playbook -i inventory.ini site.yml`,
          },
        ],
      },
    ],
    docs: { label: "Ansible Documentation", url: "https://docs.ansible.com/" },
    kb: { label: "Ansible Community Forum", url: "https://forum.ansible.com/" },
    related: ["puppet", "salt", "chef-infra"],
  },
  {
    slug: "puppet",
    toolName: "Puppet (OSS)",
    categorySlug: "configuration-management",
    toolSlug: "puppet",
    headline: "How to Install & Set Up Puppet",
    summary:
      "Install open source Puppet — a Puppet server plus agents — for declarative configuration management at scale.",
    updated: "2026",
    prerequisites: [
      "A server host for the Puppet server (4 GB+ RAM) and one or more agent nodes",
      "Resolvable hostnames and synchronized clocks (NTP) across all nodes",
    ],
    sections: [
      {
        heading: "Add the Puppet 8 repository (Ubuntu 22.04)",
        code: [
          {
            code: `wget https://apt.puppet.com/puppet8-release-jammy.deb
sudo dpkg -i puppet8-release-jammy.deb
sudo apt update`,
          },
        ],
      },
      {
        heading: "Install the server and agents",
        code: [
          { label: "on the server", code: `sudo apt install -y puppetserver` },
          { label: "on each managed node", code: `sudo apt install -y puppet-agent` },
        ],
      },
      {
        heading: "Verify and run the agent",
        code: [
          {
            code: `/opt/puppetlabs/bin/puppet --version
sudo /opt/puppetlabs/bin/puppet agent --test`,
          },
        ],
        note: "On first run each agent submits a certificate signing request; sign it on the server with puppetserver ca sign --certname <node>.",
      },
    ],
    docs: { label: "Puppet Documentation", url: "https://www.puppet.com/docs/puppet/8/puppet_index.html" },
    kb: { label: "Puppet Community", url: "https://community.puppet.com/" },
    related: ["ansible", "chef-infra", "foreman"],
  },
  {
    slug: "chef-infra",
    toolName: "Chef Infra",
    categorySlug: "configuration-management",
    toolSlug: "chef-infra",
    headline: "How to Install & Set Up Chef Infra",
    summary:
      "Install Chef Workstation to author, test, and apply Chef Infra cookbooks for Ruby-based infrastructure automation.",
    updated: "2026",
    prerequisites: [
      "A workstation (Linux, macOS, or Windows) to author cookbooks",
      "Target nodes reachable over SSH/WinRM",
    ],
    sections: [
      {
        heading: "Install Chef Workstation",
        code: [
          { label: "Linux / macOS", code: `curl -L https://omnitruck.chef.io/install.sh | sudo bash -s -- -P chef-workstation` },
          { label: "Windows (Chocolatey)", code: `choco install chef-workstation` },
        ],
      },
      {
        heading: "Verify the installation",
        code: [{ code: `chef -v` }],
      },
      {
        heading: "Generate and apply your first cookbook",
        code: [
          {
            code: `chef generate cookbook my_cookbook
cd my_cookbook
# apply it locally without a Chef Server:
sudo chef-client --local-mode --runlist 'recipe[my_cookbook::default]'`,
          },
        ],
      },
    ],
    docs: { label: "Chef Documentation", url: "https://docs.chef.io/" },
    kb: { label: "Chef Community Discourse", url: "https://discourse.chef.io/" },
    related: ["ansible", "puppet", "salt"],
  },
  {
    slug: "salt",
    toolName: "Salt (SaltStack)",
    categorySlug: "configuration-management",
    toolSlug: "salt",
    headline: "How to Install & Set Up Salt",
    summary:
      "Install SaltStack — event-driven configuration management and remote execution — using the official bootstrap script.",
    updated: "2026",
    prerequisites: [
      "A master host and one or more minion hosts (they can be the same box for testing)",
      "Root/sudo access and network connectivity from minions to the master on ports 4505/4506",
    ],
    sections: [
      {
        heading: "Install master and minion with the bootstrap script",
        paragraphs: ["The -M flag installs the master and -P allows pip-based dependencies. Run it on the box that will be the master."],
        code: [
          {
            code: `curl -o bootstrap-salt.sh -L https://github.com/saltstack/salt-bootstrap/releases/latest/download/bootstrap-salt.sh
sudo sh bootstrap-salt.sh -M -P`,
          },
        ],
      },
      {
        heading: "Accept minion keys on the master",
        code: [
          {
            code: `sudo salt-key -L        # list pending keys
sudo salt-key -A        # accept all pending minions`,
          },
        ],
      },
      {
        heading: "Verify the installation",
        code: [
          {
            code: `salt --version
sudo salt '*' test.ping`,
          },
        ],
      },
    ],
    docs: { label: "Salt Documentation", url: "https://docs.saltproject.io/" },
    kb: { label: "Salt Project Community", url: "https://saltproject.io/community/" },
    related: ["ansible", "puppet", "chef-infra"],
  },

  // ===================================================================
  // Containers & Runtime
  // ===================================================================
  {
    slug: "docker-engine",
    toolName: "Docker Engine",
    categorySlug: "containers-runtime",
    toolSlug: "docker-engine",
    headline: "How to Install & Set Up Docker Engine",
    summary:
      "Install Docker Engine on Linux from the official APT repository, run it without sudo, and launch your first container.",
    updated: "2026",
    featured: true,
    prerequisites: [
      "A 64-bit Ubuntu/Debian host (or another supported Linux distribution)",
      "sudo privileges; remove any distro-packaged docker.io first to avoid conflicts",
    ],
    sections: [
      {
        heading: "Add Docker's official APT repository",
        code: [
          {
            code: `sudo apt-get update
sudo apt-get install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update`,
          },
        ],
      },
      {
        heading: "Install the Docker packages",
        code: [
          {
            code: `sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin`,
          },
        ],
      },
      {
        heading: "Run Docker without sudo (optional)",
        code: [
          {
            code: `sudo usermod -aG docker $USER
newgrp docker`,
          },
        ],
        note: "Adding your user to the docker group grants root-equivalent access to the host. Only do this on machines you trust.",
      },
      {
        heading: "Verify the installation",
        code: [
          {
            code: `docker --version
docker run hello-world`,
          },
        ],
      },
    ],
    docs: { label: "Docker Documentation", url: "https://docs.docker.com/" },
    kb: { label: "Docker Community Forums", url: "https://forums.docker.com/" },
    related: ["podman", "containerd", "kubernetes"],
  },
  {
    slug: "podman",
    toolName: "Podman",
    categorySlug: "containers-runtime",
    toolSlug: "podman",
    headline: "How to Install & Set Up Podman",
    summary:
      "Install Podman — the daemonless, rootless, Docker-CLI-compatible container engine — on Linux, macOS, or Windows.",
    updated: "2026",
    featured: true,
    prerequisites: ["A Linux host, or macOS/Windows (which run containers inside a managed VM)"],
    sections: [
      {
        heading: "Install Podman",
        code: [
          { label: "Ubuntu / Debian", code: `sudo apt-get update
sudo apt-get install -y podman` },
          { label: "Fedora / RHEL", code: `sudo dnf install -y podman` },
          { label: "macOS (Homebrew)", code: `brew install podman` },
        ],
      },
      {
        heading: "macOS / Windows: start the Podman machine",
        paragraphs: ["On macOS and Windows, containers run inside a lightweight VM you initialize once."],
        code: [
          {
            code: `podman machine init
podman machine start`,
          },
        ],
      },
      {
        heading: "Verify the installation",
        code: [
          {
            code: `podman --version
podman run hello-world`,
          },
        ],
        note: "Prefer the Docker CLI? Run 'alias docker=podman' — Podman accepts the same commands.",
      },
    ],
    docs: { label: "Podman Documentation", url: "https://docs.podman.io/" },
    kb: { label: "Podman GitHub Discussions", url: "https://github.com/containers/podman/discussions" },
    related: ["docker-engine", "buildah", "cri-o"],
  },
  {
    slug: "containerd",
    toolName: "containerd",
    categorySlug: "containers-runtime",
    toolSlug: "containerd",
    headline: "How to Install & Set Up containerd",
    summary:
      "Install containerd — the industry-standard container runtime beneath Docker and Kubernetes — and generate its default configuration.",
    updated: "2026",
    prerequisites: ["A 64-bit Linux host with sudo access"],
    sections: [
      {
        heading: "Install containerd",
        paragraphs: ["The simplest route on Ubuntu is the containerd.io package from Docker's repository (see the Docker Engine guide for adding the repo)."],
        code: [{ code: `sudo apt-get install -y containerd.io` }],
      },
      {
        heading: "Generate the default config",
        code: [
          {
            code: `sudo mkdir -p /etc/containerd
containerd config default | sudo tee /etc/containerd/config.toml
sudo systemctl restart containerd
sudo systemctl enable containerd`,
          },
        ],
        note: "For Kubernetes, set SystemdCgroup = true under the runc options in /etc/containerd/config.toml.",
      },
      {
        heading: "Verify the installation",
        code: [{ code: `sudo ctr version` }],
      },
    ],
    docs: { label: "containerd Documentation", url: "https://containerd.io/docs/" },
    kb: { label: "containerd GitHub Discussions", url: "https://github.com/containerd/containerd/discussions" },
    related: ["docker-engine", "cri-o", "kubernetes"],
  },
  {
    slug: "cri-o",
    toolName: "CRI-O",
    categorySlug: "containers-runtime",
    toolSlug: "cri-o",
    headline: "How to Install & Set Up CRI-O",
    summary:
      "Install CRI-O — a lightweight container runtime built specifically for Kubernetes — matched to your Kubernetes minor version.",
    updated: "2026",
    prerequisites: [
      "A Linux host that will become a Kubernetes node",
      "Knowledge of which Kubernetes minor version you are targeting",
    ],
    sections: [
      {
        heading: "Add the CRI-O repository (Ubuntu)",
        paragraphs: ["Pin CRI-O to the same minor version as your Kubernetes cluster."],
        code: [
          {
            code: `CRIO_VERSION=v1.30
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://pkgs.k8s.io/addons:/cri-o:/stable:/$CRIO_VERSION/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/cri-o-apt-keyring.gpg
echo "deb [signed-by=/etc/apt/keyrings/cri-o-apt-keyring.gpg] https://pkgs.k8s.io/addons:/cri-o:/stable:/$CRIO_VERSION/deb/ /" | sudo tee /etc/apt/sources.list.d/cri-o.list
sudo apt-get update`,
          },
        ],
      },
      {
        heading: "Install and start CRI-O",
        code: [
          {
            code: `sudo apt-get install -y cri-o
sudo systemctl enable --now crio`,
          },
        ],
      },
      {
        heading: "Verify the installation",
        code: [{ code: `sudo crio --version` }],
      },
    ],
    docs: { label: "CRI-O Documentation", url: "https://github.com/cri-o/cri-o/blob/main/install.md" },
    kb: { label: "CRI-O GitHub Discussions", url: "https://github.com/cri-o/cri-o/discussions" },
    related: ["containerd", "kubernetes", "podman"],
  },
  {
    slug: "buildah",
    toolName: "Buildah",
    categorySlug: "containers-runtime",
    toolSlug: "buildah",
    headline: "How to Install & Set Up Buildah",
    summary:
      "Install Buildah to build OCI-compliant container images without a daemon — from a Dockerfile or scripted step by step.",
    updated: "2026",
    prerequisites: ["A Linux host with sudo access"],
    sections: [
      {
        heading: "Install Buildah",
        code: [
          { label: "Ubuntu / Debian", code: `sudo apt-get install -y buildah` },
          { label: "Fedora / RHEL", code: `sudo dnf install -y buildah` },
        ],
      },
      {
        heading: "Verify the installation",
        code: [{ code: `buildah --version` }],
      },
      {
        heading: "Build your first image",
        code: [
          {
            label: "from a Dockerfile",
            code: `buildah bud -t my-image:latest .`,
          },
          {
            label: "or scripted, step by step",
            code: `container=$(buildah from alpine)
buildah run $container apk add --no-cache curl
buildah commit $container my-image:latest`,
          },
        ],
      },
    ],
    docs: { label: "Buildah Documentation", url: "https://buildah.io/" },
    kb: { label: "Buildah GitHub Discussions", url: "https://github.com/containers/buildah/discussions" },
    related: ["podman", "docker-engine", "harbor"],
  },

  // ===================================================================
  // Container Orchestration
  // ===================================================================
  {
    slug: "kubernetes",
    toolName: "Kubernetes",
    categorySlug: "orchestration",
    toolSlug: "kubernetes",
    headline: "How to Install & Set Up Kubernetes",
    summary:
      "Install the kubectl CLI and bootstrap a Kubernetes cluster with kubeadm — the standard way to run Kubernetes on your own hosts.",
    updated: "2026",
    featured: true,
    prerequisites: [
      "One or more Linux hosts (2 GB+ RAM, 2 vCPUs each) with swap disabled",
      "A container runtime installed (containerd or CRI-O) on every node",
      "Networking between nodes and unique hostnames/MAC addresses",
    ],
    sections: [
      {
        heading: "Install kubectl",
        code: [
          {
            code: `curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl`,
          },
        ],
      },
      {
        heading: "Bootstrap a control plane with kubeadm",
        code: [
          {
            code: `sudo kubeadm init --pod-network-cidr=10.244.0.0/16
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config`,
          },
        ],
        note: "After init, install a CNI plugin (e.g. Flannel or Calico) or your nodes will stay NotReady. Join workers with the kubeadm join command printed by init.",
      },
      {
        heading: "Verify the installation",
        code: [
          {
            code: `kubectl get nodes
kubectl get pods -A`,
          },
        ],
      },
    ],
    docs: { label: "Kubernetes Documentation", url: "https://kubernetes.io/docs/" },
    kb: { label: "Kubernetes Community Forum", url: "https://discuss.kubernetes.io/" },
    related: ["k3s", "minikube-kind", "argo-cd"],
  },
  {
    slug: "k3s",
    toolName: "k3s",
    categorySlug: "orchestration",
    toolSlug: "k3s",
    headline: "How to Install & Set Up k3s",
    summary:
      "Install k3s — a lightweight, single-binary Kubernetes distribution — in a single command, ideal for edge and small clusters.",
    updated: "2026",
    prerequisites: ["A Linux host with 512 MB+ RAM (1 GB recommended)"],
    sections: [
      {
        heading: "Install the k3s server",
        code: [{ code: `curl -sfL https://get.k3s.io | sh -` }],
        note: "This installs k3s as a systemd service and writes a kubeconfig to /etc/rancher/k3s/k3s.yaml.",
      },
      {
        heading: "Add worker nodes (optional)",
        paragraphs: ["Get the node token from the server, then run the installer on each agent pointing at the server URL."],
        code: [
          {
            code: `# on the server:
sudo cat /var/lib/rancher/k3s/server/node-token

# on each agent:
curl -sfL https://get.k3s.io | K3S_URL=https://SERVER_IP:6443 K3S_TOKEN=NODE_TOKEN sh -`,
          },
        ],
      },
      {
        heading: "Verify the installation",
        code: [{ code: `sudo k3s kubectl get nodes` }],
      },
    ],
    docs: { label: "k3s Documentation", url: "https://docs.k3s.io/" },
    kb: { label: "k3s GitHub Discussions", url: "https://github.com/k3s-io/k3s/discussions" },
    related: ["kubernetes", "k0s", "rancher"],
  },
  {
    slug: "k0s",
    toolName: "k0s",
    categorySlug: "orchestration",
    toolSlug: "k0s",
    headline: "How to Install & Set Up k0s",
    summary:
      "Install k0s — a zero-friction, single-binary Kubernetes distribution with no host OS dependencies — as a single-node cluster.",
    updated: "2026",
    prerequisites: ["A Linux host with 1 GB+ RAM and sudo access"],
    sections: [
      {
        heading: "Download and install k0s",
        code: [{ code: `curl -sSLf https://get.k0s.sh | sudo sh` }],
      },
      {
        heading: "Run a single-node cluster",
        code: [
          {
            code: `sudo k0s install controller --single
sudo k0s start`,
          },
        ],
      },
      {
        heading: "Verify the installation",
        code: [
          {
            code: `sudo k0s status
sudo k0s kubectl get nodes`,
          },
        ],
      },
    ],
    docs: { label: "k0s Documentation", url: "https://docs.k0sproject.io/" },
    kb: { label: "k0s GitHub Discussions", url: "https://github.com/k0sproject/k0s/discussions" },
    related: ["k3s", "kubernetes", "microk8s"],
  },
  {
    slug: "microk8s",
    toolName: "MicroK8s",
    categorySlug: "orchestration",
    toolSlug: "microk8s",
    headline: "How to Install & Set Up MicroK8s",
    summary:
      "Install Canonical's MicroK8s from a snap — a minimal, production-grade Kubernetes with add-ons enabled by a single command.",
    updated: "2026",
    prerequisites: ["A Linux host with snapd (Ubuntu ships it by default), 4 GB+ RAM"],
    sections: [
      {
        heading: "Install MicroK8s",
        code: [
          {
            code: `sudo snap install microk8s --classic
sudo usermod -aG microk8s $USER
mkdir -p ~/.kube && sudo chown -R $USER ~/.kube
newgrp microk8s`,
          },
        ],
      },
      {
        heading: "Enable common add-ons",
        code: [{ code: `microk8s enable dns dashboard storage` }],
      },
      {
        heading: "Verify the installation",
        code: [
          {
            code: `microk8s status --wait-ready
microk8s kubectl get nodes`,
          },
        ],
      },
    ],
    docs: { label: "MicroK8s Documentation", url: "https://microk8s.io/docs" },
    kb: { label: "MicroK8s Discourse", url: "https://discourse.ubuntu.com/c/microk8s/" },
    related: ["k3s", "kubernetes", "k0s"],
  },
  {
    slug: "minikube-kind",
    toolName: "Minikube / kind",
    categorySlug: "orchestration",
    toolSlug: "minikube-kind",
    headline: "How to Install & Set Up Minikube and kind",
    summary:
      "Spin up a local Kubernetes cluster for development with Minikube (VM/container-based) or kind (Kubernetes IN Docker).",
    updated: "2026",
    prerequisites: [
      "Docker (or another supported driver/hypervisor) installed",
      "kubectl installed",
    ],
    sections: [
      {
        heading: "Option A — Minikube",
        code: [
          {
            code: `curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
minikube start`,
          },
        ],
      },
      {
        heading: "Option B — kind (Kubernetes in Docker)",
        code: [
          {
            code: `curl -Lo ./kind https://kind.sigs.k8s.io/dl/latest/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
kind create cluster`,
          },
        ],
      },
      {
        heading: "Verify the cluster",
        code: [
          {
            code: `kubectl cluster-info
kubectl get nodes`,
          },
        ],
      },
    ],
    docs: { label: "Minikube Documentation", url: "https://minikube.sigs.k8s.io/docs/" },
    kb: { label: "kind Quick Start", url: "https://kind.sigs.k8s.io/docs/user/quick-start/" },
    related: ["kubernetes", "k3s", "docker-engine"],
  },
  {
    slug: "rancher",
    toolName: "Rancher",
    categorySlug: "orchestration",
    toolSlug: "rancher",
    headline: "How to Install & Set Up Rancher",
    summary:
      "Install Rancher to manage multiple Kubernetes clusters from one UI — the fast Docker single-node way, or with Helm for production.",
    updated: "2026",
    prerequisites: [
      "For the quick start: a host with Docker",
      "For production: an existing Kubernetes cluster, Helm, and cert-manager",
    ],
    sections: [
      {
        heading: "Option A — Single-node with Docker (evaluation)",
        code: [
          {
            code: `docker run -d --restart=unless-stopped \\
  -p 80:80 -p 443:443 \\
  --privileged \\
  rancher/rancher:latest`,
          },
        ],
        note: "Retrieve the bootstrap password from the container logs: docker logs <container-id> 2>&1 | grep 'Bootstrap Password'.",
      },
      {
        heading: "Option B — Production with Helm",
        code: [
          {
            code: `helm repo add rancher-stable https://releases.rancher.com/server-charts/stable
kubectl create namespace cattle-system
helm install rancher rancher-stable/rancher \\
  --namespace cattle-system \\
  --set hostname=rancher.example.com`,
          },
        ],
      },
      {
        heading: "Verify the installation",
        paragraphs: ["Open https://your-host and set the admin password to complete setup."],
      },
    ],
    docs: { label: "Rancher Documentation", url: "https://ranchermanager.docs.rancher.com/" },
    kb: { label: "Rancher Community Forums", url: "https://forums.rancher.com/" },
    related: ["kubernetes", "k3s", "argo-cd"],
  },

  // ===================================================================
  // CI (Continuous Integration)
  // ===================================================================
  {
    slug: "jenkins",
    toolName: "Jenkins",
    categorySlug: "ci",
    toolSlug: "jenkins",
    headline: "How to Install & Set Up Jenkins",
    summary:
      "Install the Jenkins LTS automation server on Ubuntu (or via Docker) and unlock the setup wizard to run your first pipeline.",
    updated: "2026",
    featured: true,
    prerequisites: [
      "A host with 2 GB+ RAM",
      "Java 17 or 21 (installed below on Ubuntu)",
    ],
    sections: [
      {
        heading: "Install Jenkins on Ubuntu (LTS repo)",
        code: [
          {
            code: `sudo apt update
sudo apt install -y fontconfig openjdk-17-jre
sudo wget -O /etc/apt/keyrings/jenkins-keyring.asc https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
echo "deb [signed-by=/etc/apt/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt-get update
sudo apt-get install -y jenkins
sudo systemctl enable --now jenkins`,
          },
        ],
      },
      {
        heading: "Alternative — run Jenkins in Docker",
        code: [
          {
            code: `docker run -d --name jenkins \\
  -p 8080:8080 -p 50000:50000 \\
  -v jenkins_home:/var/jenkins_home \\
  jenkins/jenkins:lts`,
          },
        ],
      },
      {
        heading: "Unlock and verify",
        paragraphs: ["Browse to http://your-server:8080 and paste the initial admin password:"],
        code: [{ code: `sudo cat /var/lib/jenkins/secrets/initialAdminPassword` }],
      },
    ],
    docs: { label: "Jenkins Documentation", url: "https://www.jenkins.io/doc/" },
    kb: { label: "Jenkins Community", url: "https://community.jenkins.io/" },
    related: ["woodpecker-ci", "concourse-ci", "argo-cd"],
  },
  {
    slug: "woodpecker-ci",
    toolName: "Woodpecker CI",
    categorySlug: "ci",
    toolSlug: "woodpecker-ci",
    headline: "How to Install & Set Up Woodpecker CI",
    summary:
      "Deploy Woodpecker CI — a lightweight, container-native pipeline engine — with Docker Compose, wired to your Git forge.",
    updated: "2026",
    prerequisites: [
      "Docker and Docker Compose",
      "An OAuth app on your Git host (GitHub, GitLab, Gitea, or Forgejo) for login",
    ],
    sections: [
      {
        heading: "Create a docker-compose.yml",
        code: [
          {
            label: "docker-compose.yml",
            code: `services:
  woodpecker-server:
    image: woodpeckerci/woodpecker-server:latest
    ports:
      - 8000:8000
    environment:
      - WOODPECKER_HOST=https://ci.example.com
      - WOODPECKER_GITEA=true
      - WOODPECKER_GITEA_URL=https://gitea.example.com
      - WOODPECKER_GITEA_CLIENT=your-client-id
      - WOODPECKER_GITEA_SECRET=your-client-secret
      - WOODPECKER_AGENT_SECRET=a-shared-secret
    volumes:
      - woodpecker-data:/var/lib/woodpecker
  woodpecker-agent:
    image: woodpeckerci/woodpecker-agent:latest
    command: agent
    depends_on: [woodpecker-server]
    environment:
      - WOODPECKER_SERVER=woodpecker-server:9000
      - WOODPECKER_AGENT_SECRET=a-shared-secret
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
volumes:
  woodpecker-data:`,
          },
        ],
      },
      {
        heading: "Start and verify",
        code: [{ code: `docker compose up -d` }],
        paragraphs: ["Open http://your-host:8000 and authorize with your Git host to see your repositories."],
      },
    ],
    docs: { label: "Woodpecker CI Documentation", url: "https://woodpecker-ci.org/docs/intro" },
    kb: { label: "Woodpecker GitHub Discussions", url: "https://github.com/woodpecker-ci/woodpecker/discussions" },
    related: ["jenkins", "gitea-actions", "concourse-ci"],
  },
  {
    slug: "gitea-actions",
    toolName: "Gitea Actions",
    categorySlug: "ci",
    toolSlug: "gitea-actions",
    headline: "How to Install & Set Up Gitea Actions",
    summary:
      "Enable Gitea Actions — GitHub Actions-compatible CI built into Gitea — and register an act_runner to execute workflows.",
    updated: "2026",
    prerequisites: [
      "A running Gitea instance (v1.19+) you administer",
      "Docker on the machine that will run the runner",
    ],
    sections: [
      {
        heading: "Enable Actions in Gitea",
        paragraphs: ["Add the following to Gitea's app.ini and restart Gitea."],
        code: [
          {
            label: "app.ini",
            code: `[actions]
ENABLED = true`,
          },
        ],
      },
      {
        heading: "Register an act_runner",
        paragraphs: ["Create a registration token under Site Administration → Actions → Runners, then register and start the runner."],
        code: [
          {
            code: `./act_runner register \\
  --instance https://gitea.example.com \\
  --token YOUR_REGISTRATION_TOKEN
./act_runner daemon`,
          },
        ],
      },
      {
        heading: "Verify",
        paragraphs: [
          "Add a workflow at .gitea/workflows/demo.yaml in a repository; the runner picks it up on the next push. Confirm the runner shows as Online in the admin panel.",
        ],
      },
    ],
    docs: { label: "Gitea Actions Documentation", url: "https://docs.gitea.com/usage/actions/overview" },
    kb: { label: "Gitea Community Forum", url: "https://forum.gitea.com/" },
    related: ["gitea", "forgejo", "woodpecker-ci"],
  },
  {
    slug: "concourse-ci",
    toolName: "Concourse CI",
    categorySlug: "ci",
    toolSlug: "concourse-ci",
    headline: "How to Install & Set Up Concourse CI",
    summary:
      "Run Concourse CI — pipeline-based CI/CD with a strong focus on reproducibility — locally with Docker Compose and the fly CLI.",
    updated: "2026",
    prerequisites: ["Docker and Docker Compose"],
    sections: [
      {
        heading: "Start Concourse with Docker Compose",
        code: [
          {
            code: `curl -O https://concourse-ci.org/docker-compose.yml
docker compose up -d`,
          },
        ],
      },
      {
        heading: "Install the fly CLI and log in",
        paragraphs: ["Download fly from the running web UI (http://localhost:8080) or use the target below, then log in with the demo credentials."],
        code: [
          {
            code: `fly -t local login -c http://localhost:8080 -u test -p test
fly -t local sync`,
          },
        ],
      },
      {
        heading: "Set your first pipeline",
        code: [{ code: `fly -t local set-pipeline -p hello -c pipeline.yml` }],
      },
    ],
    docs: { label: "Concourse CI Documentation", url: "https://concourse-ci.org/docs.html" },
    kb: { label: "Concourse GitHub Discussions", url: "https://github.com/concourse/concourse/discussions" },
    related: ["jenkins", "woodpecker-ci", "tekton"],
  },

  // ===================================================================
  // CD / GitOps
  // ===================================================================
  {
    slug: "argo-cd",
    toolName: "Argo CD",
    categorySlug: "cd-gitops",
    toolSlug: "argo-cd",
    headline: "How to Install & Set Up Argo CD",
    summary:
      "Install Argo CD into Kubernetes for declarative GitOps continuous delivery, then log in and sync your first application from Git.",
    updated: "2026",
    featured: true,
    prerequisites: [
      "A Kubernetes cluster (v1.25+) and kubectl configured",
      "A Git repository containing your Kubernetes manifests",
    ],
    sections: [
      {
        heading: "Install Argo CD",
        code: [
          {
            code: `kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml`,
          },
        ],
      },
      {
        heading: "Access the API/UI and log in",
        paragraphs: ["Port-forward the server, then get the auto-generated admin password."],
        code: [
          {
            code: `kubectl port-forward svc/argocd-server -n argocd 8080:443

# in another terminal — the initial admin password:
kubectl -n argocd get secret argocd-initial-admin-secret \\
  -o jsonpath="{.data.password}" | base64 -d; echo`,
          },
        ],
      },
      {
        heading: "Install the CLI and create an app",
        code: [
          {
            code: `# install the argocd CLI (Linux):
curl -sSL -o argocd https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
sudo install -m 555 argocd /usr/local/bin/argocd

argocd login localhost:8080
argocd app create guestbook \\
  --repo https://github.com/argoproj/argocd-example-apps.git \\
  --path guestbook --dest-server https://kubernetes.default.svc --dest-namespace default
argocd app sync guestbook`,
          },
        ],
      },
    ],
    docs: { label: "Argo CD Documentation", url: "https://argo-cd.readthedocs.io/en/stable/" },
    kb: { label: "Argo Project GitHub Discussions", url: "https://github.com/argoproj/argo-cd/discussions" },
    related: ["flux-cd", "argo-rollouts-workflows", "kubernetes"],
  },
  {
    slug: "flux-cd",
    toolName: "Flux CD",
    categorySlug: "cd-gitops",
    toolSlug: "flux-cd",
    headline: "How to Install & Set Up Flux CD",
    summary:
      "Install the Flux CLI and bootstrap the GitOps toolkit so your cluster continuously reconciles with a Git repository.",
    updated: "2026",
    prerequisites: [
      "A Kubernetes cluster and kubectl configured",
      "A GitHub/GitLab personal access token with repo scope",
    ],
    sections: [
      {
        heading: "Install the Flux CLI",
        code: [
          { label: "Linux", code: `curl -s https://fluxcd.io/install.sh | sudo bash` },
          { label: "macOS (Homebrew)", code: `brew install fluxcd/tap/flux` },
        ],
      },
      {
        heading: "Check the cluster is ready",
        code: [{ code: `flux check --pre` }],
      },
      {
        heading: "Bootstrap Flux against your repo",
        code: [
          {
            code: `export GITHUB_TOKEN=<your-pat>
flux bootstrap github \\
  --owner=my-org \\
  --repository=my-fleet \\
  --branch=main \\
  --path=./clusters/my-cluster \\
  --personal`,
          },
        ],
        note: "Bootstrap commits the Flux components into your repo and installs them — from then on, Git is the source of truth.",
      },
    ],
    docs: { label: "Flux Documentation", url: "https://fluxcd.io/flux/installation/" },
    kb: { label: "Flux GitHub Discussions", url: "https://github.com/fluxcd/flux2/discussions" },
    related: ["argo-cd", "kubernetes", "crossplane"],
  },
  {
    slug: "tekton",
    toolName: "Tekton",
    categorySlug: "cd-gitops",
    toolSlug: "tekton",
    headline: "How to Install & Set Up Tekton",
    summary:
      "Install Tekton Pipelines and the tkn CLI to build Kubernetes-native CI/CD from reusable Tasks and Pipelines.",
    updated: "2026",
    prerequisites: [
      "A Kubernetes cluster (v1.28+) and kubectl configured",
      "A default StorageClass for pipeline workspaces",
    ],
    sections: [
      {
        heading: "Install Tekton Pipelines",
        code: [
          {
            code: `kubectl apply -f https://storage.googleapis.com/tekton-releases/pipeline/latest/release.yaml
kubectl get pods -n tekton-pipelines --watch`,
          },
        ],
      },
      {
        heading: "Install the tkn CLI",
        code: [
          { label: "Linux", code: `curl -LO https://github.com/tektoncd/cli/releases/latest/download/tkn_Linux_x86_64.tar.gz
sudo tar xvzf tkn_Linux_x86_64.tar.gz -C /usr/local/bin/ tkn` },
          { label: "macOS (Homebrew)", code: `brew install tektoncd-cli` },
        ],
      },
      {
        heading: "Verify the installation",
        code: [
          {
            code: `tkn version
kubectl get pods -n tekton-pipelines`,
          },
        ],
      },
    ],
    docs: { label: "Tekton Documentation", url: "https://tekton.dev/docs/" },
    kb: { label: "Tekton GitHub Discussions", url: "https://github.com/tektoncd/pipeline/discussions" },
    related: ["argo-cd", "jenkins", "concourse-ci"],
  },
  {
    slug: "spinnaker",
    toolName: "Spinnaker",
    categorySlug: "cd-gitops",
    toolSlug: "spinnaker",
    headline: "How to Install & Set Up Spinnaker",
    summary:
      "Install Spinnaker on Kubernetes using the Halyard configuration tool for multi-cloud continuous delivery.",
    updated: "2026",
    prerequisites: [
      "A Kubernetes cluster and kubectl configured",
      "An object storage bucket (S3, GCS, or Minio) for Spinnaker's persistent config",
      "Halyard (Spinnaker's installer/CLI) or the Spinnaker Operator",
    ],
    sections: [
      {
        heading: "Install Halyard",
        code: [
          {
            code: `curl -O https://raw.githubusercontent.com/spinnaker/halyard/master/install/debian/InstallHalyard.sh
sudo bash InstallHalyard.sh
hal -v`,
          },
        ],
      },
      {
        heading: "Configure and deploy",
        paragraphs: ["Choose a cloud provider, a storage backend, and the target version, then deploy."],
        code: [
          {
            code: `hal config provider kubernetes enable
hal config storage s3 edit --bucket my-spinnaker-bucket
hal config storage edit --type s3
hal version list
hal config version edit --version 1.35.0
hal deploy apply`,
          },
        ],
        note: "For a distributed install onto Kubernetes, run 'hal config deploy edit --type distributed --account-name my-k8s-account' before deploying.",
      },
      {
        heading: "Access the UI",
        code: [{ code: `hal deploy connect` }],
      },
    ],
    docs: { label: "Spinnaker Documentation", url: "https://spinnaker.io/docs/" },
    kb: { label: "Spinnaker Community", url: "https://spinnaker.io/community/" },
    related: ["argo-cd", "flux-cd", "tekton"],
  },
  {
    slug: "argo-rollouts-workflows",
    toolName: "Argo Rollouts / Workflows",
    categorySlug: "cd-gitops",
    toolSlug: "argo-rollouts-workflows",
    headline: "How to Install & Set Up Argo Rollouts & Workflows",
    summary:
      "Install Argo Rollouts for progressive delivery (canary/blue-green) and Argo Workflows for Kubernetes-native pipelines.",
    updated: "2026",
    prerequisites: ["A Kubernetes cluster and kubectl configured"],
    sections: [
      {
        heading: "Install Argo Rollouts",
        code: [
          {
            code: `kubectl create namespace argo-rollouts
kubectl apply -n argo-rollouts -f https://github.com/argoproj/argo-rollouts/releases/latest/download/install.yaml`,
          },
        ],
      },
      {
        heading: "Install the kubectl-argo-rollouts plugin",
        code: [
          {
            code: `curl -LO https://github.com/argoproj/argo-rollouts/releases/latest/download/kubectl-argo-rollouts-linux-amd64
chmod +x ./kubectl-argo-rollouts-linux-amd64
sudo mv ./kubectl-argo-rollouts-linux-amd64 /usr/local/bin/kubectl-argo-rollouts`,
          },
        ],
      },
      {
        heading: "Install Argo Workflows",
        code: [
          {
            code: `kubectl create namespace argo
kubectl apply -n argo -f https://github.com/argoproj/argo-workflows/releases/latest/download/quick-start-minimal.yaml`,
          },
        ],
      },
      {
        heading: "Verify",
        code: [
          {
            code: `kubectl argo rollouts version
kubectl get pods -n argo`,
          },
        ],
      },
    ],
    docs: { label: "Argo Rollouts Documentation", url: "https://argo-rollouts.readthedocs.io/" },
    kb: { label: "Argo Project GitHub Discussions", url: "https://github.com/argoproj/argo-rollouts/discussions" },
    related: ["argo-cd", "flux-cd", "tekton"],
  },

  // ===================================================================
  // Artifact & Container Registries
  // ===================================================================
  {
    slug: "harbor",
    toolName: "Harbor",
    categorySlug: "registries",
    toolSlug: "harbor",
    headline: "How to Install & Set Up Harbor",
    summary:
      "Install Harbor — a container registry with vulnerability scanning and RBAC — using the official online installer.",
    updated: "2026",
    prerequisites: [
      "A Linux host with Docker and Docker Compose",
      "A resolvable hostname and, ideally, a TLS certificate",
      "2 CPUs / 4 GB RAM minimum",
    ],
    sections: [
      {
        heading: "Download the installer",
        paragraphs: ["Grab the latest online installer tarball from the Harbor releases and extract it."],
        code: [
          {
            code: `curl -LO https://github.com/goharbor/harbor/releases/download/v2.11.0/harbor-online-installer-v2.11.0.tgz
tar xzvf harbor-online-installer-v2.11.0.tgz
cd harbor
cp harbor.yml.tmpl harbor.yml`,
          },
        ],
      },
      {
        heading: "Configure and install",
        paragraphs: ["Edit harbor.yml — set hostname and either configure the https block or comment it out for an http-only test — then run the installer."],
        code: [{ code: `sudo ./install.sh` }],
      },
      {
        heading: "Verify",
        paragraphs: ["Open https://your-hostname and log in as admin with the harbor_admin_password from harbor.yml, then push an image:"],
        code: [
          {
            code: `docker login your-hostname
docker tag alpine your-hostname/library/alpine:test
docker push your-hostname/library/alpine:test`,
          },
        ],
      },
    ],
    docs: { label: "Harbor Documentation", url: "https://goharbor.io/docs/" },
    kb: { label: "Harbor GitHub Discussions", url: "https://github.com/goharbor/harbor/discussions" },
    related: ["docker-distribution", "nexus-oss", "docker-engine"],
  },
  {
    slug: "nexus-oss",
    toolName: "Nexus Repository OSS",
    categorySlug: "registries",
    toolSlug: "nexus-oss",
    headline: "How to Install & Set Up Nexus Repository OSS",
    summary:
      "Run Sonatype Nexus Repository OSS — a universal artifact manager for Maven, npm, Docker, and more — the fast way with Docker.",
    updated: "2026",
    prerequisites: [
      "A host with 4 GB+ RAM and Java 8/11 (bundled in the Docker image)",
      "Docker (for the container method)",
    ],
    sections: [
      {
        heading: "Run Nexus with Docker",
        code: [
          {
            code: `docker volume create nexus-data
docker run -d -p 8081:8081 --name nexus \\
  -v nexus-data:/nexus-data \\
  sonatype/nexus3`,
          },
        ],
      },
      {
        heading: "Retrieve the admin password",
        paragraphs: ["Nexus generates a one-time admin password on first boot."],
        code: [{ code: `docker exec nexus cat /nexus-data/admin.password` }],
      },
      {
        heading: "Verify",
        paragraphs: [
          "Open http://your-host:8081, sign in as admin with that password, and complete the setup wizard to set a new password and anonymous-access policy.",
        ],
      },
    ],
    docs: { label: "Nexus Repository Documentation", url: "https://help.sonatype.com/en/sonatype-nexus-repository.html" },
    kb: { label: "Sonatype Community", url: "https://community.sonatype.com/" },
    related: ["harbor", "docker-distribution"],
  },
  {
    slug: "docker-distribution",
    toolName: "Docker Distribution",
    categorySlug: "registries",
    toolSlug: "docker-distribution",
    headline: "How to Install & Set Up Docker Distribution (Registry)",
    summary:
      "Run the open source Docker Distribution registry — the reference implementation behind Docker Hub's protocol — in one container.",
    updated: "2026",
    prerequisites: ["A host with Docker installed"],
    sections: [
      {
        heading: "Run the registry",
        code: [
          {
            code: `docker run -d -p 5000:5000 --name registry \\
  -v registry-data:/var/lib/registry \\
  registry:2`,
          },
        ],
      },
      {
        heading: "Push and pull an image",
        code: [
          {
            code: `docker pull alpine
docker tag alpine localhost:5000/alpine
docker push localhost:5000/alpine
docker pull localhost:5000/alpine`,
          },
        ],
        note: "For remote use, put a reverse proxy with TLS in front of the registry — Docker refuses plain-HTTP registries other than localhost by default.",
      },
      {
        heading: "Verify",
        code: [{ code: `curl http://localhost:5000/v2/_catalog` }],
      },
    ],
    docs: { label: "Distribution Documentation", url: "https://distribution.github.io/distribution/" },
    kb: { label: "Distribution GitHub Discussions", url: "https://github.com/distribution/distribution/discussions" },
    related: ["harbor", "nexus-oss", "docker-engine"],
  },

  // ===================================================================
  // Monitoring
  // ===================================================================
  {
    slug: "prometheus",
    toolName: "Prometheus",
    categorySlug: "monitoring",
    toolSlug: "prometheus",
    headline: "How to Install & Set Up Prometheus",
    summary:
      "Install Prometheus — the CNCF standard for pull-based metrics and alerting — from the official binary and scrape your first target.",
    updated: "2026",
    featured: true,
    prerequisites: ["A Linux host", "Targets that expose metrics on a /metrics endpoint"],
    sections: [
      {
        heading: "Download and extract Prometheus",
        code: [
          {
            code: `curl -LO https://github.com/prometheus/prometheus/releases/download/v2.53.0/prometheus-2.53.0.linux-amd64.tar.gz
tar xvfz prometheus-2.53.0.linux-amd64.tar.gz
cd prometheus-2.53.0.linux-amd64`,
          },
        ],
      },
      {
        heading: "Configure a scrape target",
        code: [
          {
            label: "prometheus.yml",
            code: `global:
  scrape_interval: 15s
scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]`,
          },
        ],
      },
      {
        heading: "Run and verify",
        code: [{ code: `./prometheus --config.file=prometheus.yml` }],
        paragraphs: ["Open http://localhost:9090 and run a query such as 'up' in the expression browser."],
      },
    ],
    docs: { label: "Prometheus Documentation", url: "https://prometheus.io/docs/" },
    kb: { label: "Prometheus Community", url: "https://prometheus.io/community/" },
    related: ["grafana", "victoriametrics", "loki"],
  },
  {
    slug: "grafana",
    toolName: "Grafana",
    categorySlug: "monitoring",
    toolSlug: "grafana",
    headline: "How to Install & Set Up Grafana",
    summary:
      "Install Grafana OSS from the official APT repository (or Docker) and connect your first data source to build dashboards.",
    updated: "2026",
    featured: true,
    prerequisites: ["A Linux host", "A data source such as Prometheus, Loki, or a SQL database"],
    sections: [
      {
        heading: "Install on Ubuntu/Debian (APT repo)",
        code: [
          {
            code: `sudo apt-get install -y apt-transport-https software-properties-common wget
sudo mkdir -p /etc/apt/keyrings/
wget -q -O - https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt-get update
sudo apt-get install -y grafana
sudo systemctl enable --now grafana-server`,
          },
        ],
      },
      {
        heading: "Alternative — run Grafana in Docker",
        code: [{ code: `docker run -d -p 3000:3000 --name grafana grafana/grafana-oss` }],
      },
      {
        heading: "Verify and log in",
        paragraphs: ["Open http://your-host:3000 and sign in with admin / admin — you'll be prompted to set a new password immediately."],
      },
    ],
    docs: { label: "Grafana Documentation", url: "https://grafana.com/docs/grafana/latest/" },
    kb: { label: "Grafana Community Forums", url: "https://community.grafana.com/" },
    related: ["prometheus", "loki", "victoriametrics"],
  },
  {
    slug: "victoriametrics",
    toolName: "VictoriaMetrics",
    categorySlug: "monitoring",
    toolSlug: "victoriametrics",
    headline: "How to Install & Set Up VictoriaMetrics",
    summary:
      "Run VictoriaMetrics — a fast, cost-efficient, Prometheus-compatible time series database — as a single binary or container.",
    updated: "2026",
    prerequisites: ["A Linux host", "A Prometheus or vmagent instance to remote-write metrics (optional)"],
    sections: [
      {
        heading: "Download the single-node binary",
        code: [
          {
            code: `curl -LO https://github.com/VictoriaMetrics/VictoriaMetrics/releases/download/v1.102.0/victoria-metrics-linux-amd64-v1.102.0.tar.gz
tar xzf victoria-metrics-linux-amd64-v1.102.0.tar.gz
./victoria-metrics-prod -storageDataPath=./vm-data -retentionPeriod=6`,
          },
        ],
        note: "The server listens on :8428 and speaks the Prometheus remote-write and query APIs.",
      },
      {
        heading: "Alternative — Docker",
        code: [
          {
            code: `docker run -d -p 8428:8428 \\
  -v vmdata:/victoria-metrics-data \\
  victoriametrics/victoria-metrics`,
          },
        ],
      },
      {
        heading: "Verify",
        code: [{ code: `curl http://localhost:8428/health` }],
      },
    ],
    docs: { label: "VictoriaMetrics Documentation", url: "https://docs.victoriametrics.com/" },
    kb: { label: "VictoriaMetrics Community", url: "https://github.com/VictoriaMetrics/VictoriaMetrics/discussions" },
    related: ["prometheus", "grafana", "loki"],
  },
  {
    slug: "zabbix",
    toolName: "Zabbix",
    categorySlug: "monitoring",
    toolSlug: "zabbix",
    headline: "How to Install & Set Up Zabbix",
    summary:
      "Install the Zabbix server, frontend, and agent on Ubuntu for enterprise-grade monitoring of networks, servers, and applications.",
    updated: "2026",
    prerequisites: [
      "Ubuntu 22.04 host",
      "A database server (MySQL/MariaDB or PostgreSQL)",
      "A web server (Apache or Nginx) for the frontend",
    ],
    sections: [
      {
        heading: "Add the Zabbix repository",
        code: [
          {
            code: `wget https://repo.zabbix.com/zabbix/6.4/ubuntu/pool/main/z/zabbix-release/zabbix-release_6.4-1+ubuntu22.04_all.deb
sudo dpkg -i zabbix-release_6.4-1+ubuntu22.04_all.deb
sudo apt update`,
          },
        ],
      },
      {
        heading: "Install server, frontend, and agent",
        code: [
          {
            code: `sudo apt install -y zabbix-server-mysql zabbix-frontend-php \\
  zabbix-apache-conf zabbix-sql-scripts zabbix-agent`,
          },
        ],
      },
      {
        heading: "Create the database and import the schema",
        code: [
          {
            code: `sudo mysql -uroot -e "create database zabbix character set utf8mb4 collate utf8mb4_bin;"
sudo mysql -uroot -e "create user zabbix@localhost identified by 'password';"
sudo mysql -uroot -e "grant all privileges on zabbix.* to zabbix@localhost;"
zcat /usr/share/zabbix-sql-scripts/mysql/server.sql.gz | mysql --default-character-set=utf8mb4 -uzabbix -p zabbix`,
          },
        ],
        note: "Set DBPassword in /etc/zabbix/zabbix_server.conf, then restart zabbix-server, zabbix-agent, and apache2. Finish setup at http://your-host/zabbix (default login Admin / zabbix).",
      },
    ],
    docs: { label: "Zabbix Documentation", url: "https://www.zabbix.com/documentation/current/" },
    kb: { label: "Zabbix Community Forums", url: "https://www.zabbix.com/forum/" },
    related: ["prometheus", "grafana", "netdata"],
  },
  {
    slug: "netdata",
    toolName: "Netdata",
    categorySlug: "monitoring",
    toolSlug: "netdata",
    headline: "How to Install & Set Up Netdata",
    summary:
      "Install Netdata for real-time, per-second infrastructure monitoring with a zero-configuration dashboard, using the kickstart script.",
    updated: "2026",
    prerequisites: ["A Linux/macOS host with curl or wget"],
    sections: [
      {
        heading: "Install with the kickstart script",
        code: [
          {
            code: `wget -O /tmp/netdata-kickstart.sh https://get.netdata.cloud/kickstart.sh
sh /tmp/netdata-kickstart.sh`,
          },
        ],
        note: "The script auto-detects your OS, installs Netdata, and starts it as a service. Add --stable-channel for stable releases only.",
      },
      {
        heading: "Verify",
        paragraphs: ["Open http://your-host:19999 for the live dashboard — hundreds of metrics are collected automatically with no configuration."],
        code: [{ code: `sudo systemctl status netdata` }],
      },
    ],
    docs: { label: "Netdata Documentation", url: "https://learn.netdata.cloud/" },
    kb: { label: "Netdata Community Forums", url: "https://community.netdata.cloud/" },
    related: ["prometheus", "grafana", "zabbix"],
  },

  // ===================================================================
  // Logging & Tracing
  // ===================================================================
  {
    slug: "loki",
    toolName: "Grafana Loki",
    categorySlug: "logging-tracing",
    toolSlug: "loki",
    headline: "How to Install & Set Up Grafana Loki",
    summary:
      "Install Grafana Loki for log aggregation that plugs straight into Grafana — the quick way with Docker Compose, or as a single binary.",
    updated: "2026",
    prerequisites: ["A Linux host with Docker (compose method) or Grafana to visualize logs"],
    sections: [
      {
        heading: "Option A — Docker Compose (Loki + Promtail + Grafana)",
        code: [
          {
            code: `wget https://raw.githubusercontent.com/grafana/loki/main/production/docker-compose.yaml -O docker-compose.yaml
docker compose -f docker-compose.yaml up -d`,
          },
        ],
      },
      {
        heading: "Option B — Single binary",
        code: [
          {
            code: `curl -O -L "https://github.com/grafana/loki/releases/latest/download/loki-linux-amd64.zip"
unzip loki-linux-amd64.zip
curl -O -L "https://raw.githubusercontent.com/grafana/loki/main/cmd/loki/loki-local-config.yaml"
./loki-linux-amd64 -config.file=loki-local-config.yaml`,
          },
        ],
      },
      {
        heading: "Verify",
        code: [{ code: `curl http://localhost:3100/ready` }],
        paragraphs: ["In Grafana, add a Loki data source pointing at http://localhost:3100 and explore your logs."],
      },
    ],
    docs: { label: "Loki Documentation", url: "https://grafana.com/docs/loki/latest/" },
    kb: { label: "Grafana Loki Community", url: "https://community.grafana.com/c/grafana-loki/" },
    related: ["grafana", "prometheus", "fluentd-fluent-bit"],
  },
  {
    slug: "opensearch",
    toolName: "OpenSearch",
    categorySlug: "logging-tracing",
    toolSlug: "opensearch",
    headline: "How to Install & Set Up OpenSearch",
    summary:
      "Run OpenSearch — the fully open source fork of Elasticsearch — plus OpenSearch Dashboards for search and log analytics.",
    updated: "2026",
    prerequisites: [
      "A host with Docker, 4 GB+ RAM",
      "vm.max_map_count set to at least 262144 (sudo sysctl -w vm.max_map_count=262144)",
    ],
    sections: [
      {
        heading: "Run a single node with Docker",
        code: [
          {
            code: `docker run -d --name opensearch \\
  -p 9200:9200 -p 9600:9600 \\
  -e "discovery.type=single-node" \\
  -e "OPENSEARCH_INITIAL_ADMIN_PASSWORD=Str0ng!Passw0rd" \\
  opensearchproject/opensearch:latest`,
          },
        ],
      },
      {
        heading: "Verify",
        code: [
          {
            code: `curl -k -u admin:Str0ng!Passw0rd https://localhost:9200`,
          },
        ],
        note: "For the Kibana-style UI, run the opensearchproject/opensearch-dashboards image and point it at your OpenSearch node.",
      },
    ],
    docs: { label: "OpenSearch Documentation", url: "https://opensearch.org/docs/latest/" },
    kb: { label: "OpenSearch Community Forum", url: "https://forum.opensearch.org/" },
    related: ["graylog", "grafana", "loki"],
  },
  {
    slug: "fluentd-fluent-bit",
    toolName: "Fluentd / Fluent Bit",
    categorySlug: "logging-tracing",
    toolSlug: "fluentd-fluent-bit",
    headline: "How to Install & Set Up Fluentd and Fluent Bit",
    summary:
      "Install Fluent Bit (the lightweight forwarder) or Fluentd (the full aggregator) to collect and route logs across your stack.",
    updated: "2026",
    prerequisites: ["A Linux host with sudo access"],
    sections: [
      {
        heading: "Install Fluent Bit",
        code: [
          {
            code: `curl https://raw.githubusercontent.com/fluent/fluent-bit/master/install.sh | sh`,
          },
        ],
      },
      {
        heading: "Install Fluentd (fluent-package)",
        code: [
          {
            code: `curl -fsSL https://toolbelt.treasuredata.com/sh/install-ubuntu-jammy-fluent-package5.sh | sh`,
          },
        ],
      },
      {
        heading: "Verify and run",
        code: [
          {
            code: `fluent-bit --version
# tail the syslog and print to stdout:
fluent-bit -i tail -p path=/var/log/syslog -o stdout`,
          },
        ],
      },
    ],
    docs: { label: "Fluent Bit Documentation", url: "https://docs.fluentbit.io/" },
    kb: { label: "Fluentd Community", url: "https://www.fluentd.org/community" },
    related: ["loki", "opensearch", "graylog"],
  },
  {
    slug: "jaeger",
    toolName: "Jaeger",
    categorySlug: "logging-tracing",
    toolSlug: "jaeger",
    headline: "How to Install & Set Up Jaeger",
    summary:
      "Run Jaeger for distributed tracing across microservices — the all-in-one Docker image gets you a UI and OTLP endpoints instantly.",
    updated: "2026",
    prerequisites: ["A host with Docker", "Services instrumented with OpenTelemetry or the Jaeger clients"],
    sections: [
      {
        heading: "Run the all-in-one image",
        code: [
          {
            code: `docker run -d --name jaeger \\
  -p 16686:16686 \\
  -p 4317:4317 -p 4318:4318 \\
  jaegertracing/all-in-one:latest`,
          },
        ],
        note: "Ports 4317/4318 accept OpenTelemetry (OTLP) gRPC/HTTP spans; 16686 serves the UI. all-in-one keeps traces in memory — use a real storage backend (Cassandra, Elasticsearch) for production.",
      },
      {
        heading: "Verify",
        paragraphs: ["Open http://localhost:16686, generate some traced requests, and search for them by service in the UI."],
      },
    ],
    docs: { label: "Jaeger Documentation", url: "https://www.jaegertracing.io/docs/" },
    kb: { label: "Jaeger GitHub Discussions", url: "https://github.com/jaegertracing/jaeger/discussions" },
    related: ["prometheus", "grafana", "loki"],
  },
  {
    slug: "graylog",
    toolName: "Graylog",
    categorySlug: "logging-tracing",
    toolSlug: "graylog",
    headline: "How to Install & Set Up Graylog",
    summary:
      "Deploy Graylog — centralized log management with search and alerting — using Docker Compose with MongoDB and OpenSearch.",
    updated: "2026",
    prerequisites: [
      "A host with Docker and Docker Compose, 4 GB+ RAM",
      "A generated password secret and admin password hash (commands below)",
    ],
    sections: [
      {
        heading: "Generate the required secrets",
        code: [
          {
            code: `# 96-char password secret:
openssl rand -base64 96 | tr -d '\\n'; echo
# SHA-256 hash of your admin password:
echo -n "yourpassword" | sha256sum`,
          },
        ],
      },
      {
        heading: "Create docker-compose.yml",
        code: [
          {
            label: "docker-compose.yml (abridged)",
            code: `services:
  mongodb:
    image: mongo:6.0
    volumes: [mongodb_data:/data/db]
  opensearch:
    image: opensearchproject/opensearch:2
    environment:
      - discovery.type=single-node
      - plugins.security.disabled=true
      - OPENSEARCH_JAVA_OPTS=-Xms1g -Xmx1g
    volumes: [os_data:/usr/share/opensearch/data]
  graylog:
    image: graylog/graylog:6.0
    environment:
      - GRAYLOG_PASSWORD_SECRET=PASTE_PASSWORD_SECRET
      - GRAYLOG_ROOT_PASSWORD_SHA2=PASTE_ADMIN_HASH
      - GRAYLOG_HTTP_EXTERNAL_URI=http://127.0.0.1:9000/
    ports: ["9000:9000", "12201:12201/udp"]
    depends_on: [mongodb, opensearch]
volumes: { mongodb_data: {}, os_data: {} }`,
          },
        ],
      },
      {
        heading: "Start and verify",
        code: [{ code: `docker compose up -d` }],
        paragraphs: ["Open http://localhost:9000 and log in as admin with the password you hashed above."],
      },
    ],
    docs: { label: "Graylog Documentation", url: "https://go2docs.graylog.org/" },
    kb: { label: "Graylog Community", url: "https://community.graylog.org/" },
    related: ["opensearch", "loki", "fluentd-fluent-bit"],
  },

  // ===================================================================
  // Secrets Management
  // ===================================================================
  {
    slug: "openbao",
    toolName: "OpenBao",
    categorySlug: "secrets",
    toolSlug: "openbao",
    headline: "How to Install & Set Up OpenBao",
    summary:
      "Install OpenBao — the Linux Foundation's fully open source fork of Vault — and start a dev server to store your first secret.",
    updated: "2026",
    featured: true,
    prerequisites: ["A Linux host"],
    sections: [
      {
        heading: "Install the OpenBao binary",
        code: [
          {
            code: `curl -LO https://github.com/openbao/openbao/releases/download/v2.1.0/bao_2.1.0_linux_amd64.tar.gz
tar xzf bao_2.1.0_linux_amd64.tar.gz
sudo mv bao /usr/local/bin/
bao --version`,
          },
        ],
      },
      {
        heading: "Start a dev server",
        paragraphs: ["The dev server runs in-memory, unsealed, and pre-authenticated — perfect for learning, never for production."],
        code: [{ code: `bao server -dev` }],
      },
      {
        heading: "Store and read a secret",
        code: [
          {
            code: `export BAO_ADDR='http://127.0.0.1:8200'
bao status
bao kv put secret/my-app password=s3cr3t
bao kv get secret/my-app`,
          },
        ],
      },
    ],
    docs: { label: "OpenBao Documentation", url: "https://openbao.org/docs/" },
    kb: { label: "OpenBao GitHub Discussions", url: "https://github.com/openbao/openbao/discussions" },
    related: ["vault", "sops", "external-secrets"],
  },
  {
    slug: "vault",
    toolName: "HashiCorp Vault",
    categorySlug: "secrets",
    toolSlug: "vault",
    headline: "How to Install & Set Up HashiCorp Vault",
    summary:
      "Install HashiCorp Vault from the official APT repository, start a dev server, and write your first secret.",
    updated: "2026",
    featured: true,
    prerequisites: ["A Linux host"],
    sections: [
      {
        heading: "Install on Ubuntu/Debian (HashiCorp APT repo)",
        code: [
          {
            code: `wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install vault`,
          },
        ],
      },
      {
        heading: "Start a dev server",
        code: [{ code: `vault server -dev` }],
        note: "Vault is licensed under the BUSL. For a fully open source, OSI-approved alternative, see the OpenBao guide.",
      },
      {
        heading: "Write and read a secret",
        code: [
          {
            code: `export VAULT_ADDR='http://127.0.0.1:8200'
vault status
vault kv put secret/my-app password=s3cr3t
vault kv get secret/my-app`,
          },
        ],
      },
    ],
    docs: { label: "Vault Documentation", url: "https://developer.hashicorp.com/vault/docs" },
    kb: { label: "HashiCorp Discuss — Vault", url: "https://discuss.hashicorp.com/c/vault/30" },
    related: ["openbao", "sops", "external-secrets"],
  },
  {
    slug: "sops",
    toolName: "SOPS",
    categorySlug: "secrets",
    toolSlug: "sops",
    headline: "How to Install & Set Up SOPS",
    summary:
      "Install SOPS to encrypt values inside YAML/JSON/ENV files so secrets can live safely in Git, using an age key.",
    updated: "2026",
    prerequisites: ["A Linux/macOS host", "An encryption key — age, GPG, or a cloud KMS"],
    sections: [
      {
        heading: "Install SOPS",
        code: [
          { label: "Linux (binary)", code: `curl -LO https://github.com/getsops/sops/releases/download/v3.9.0/sops-v3.9.0.linux.amd64
sudo mv sops-v3.9.0.linux.amd64 /usr/local/bin/sops
sudo chmod +x /usr/local/bin/sops` },
          { label: "macOS (Homebrew)", code: `brew install sops age` },
        ],
      },
      {
        heading: "Create an age key and encrypt a file",
        code: [
          {
            code: `age-keygen -o key.txt          # prints the public key
export SOPS_AGE_KEY_FILE=$PWD/key.txt
sops --encrypt --age age1examplepublickey... secrets.yaml > secrets.enc.yaml`,
          },
        ],
      },
      {
        heading: "Edit and verify",
        code: [
          {
            code: `sops --version
sops secrets.enc.yaml          # opens decrypted in your editor`,
          },
        ],
      },
    ],
    docs: { label: "SOPS Documentation", url: "https://github.com/getsops/sops#readme" },
    kb: { label: "SOPS GitHub Discussions", url: "https://github.com/getsops/sops/discussions" },
    related: ["openbao", "vault", "external-secrets"],
  },
  {
    slug: "external-secrets",
    toolName: "External Secrets Operator",
    categorySlug: "secrets",
    toolSlug: "external-secrets",
    headline: "How to Install & Set Up External Secrets Operator",
    summary:
      "Install the External Secrets Operator to sync secrets from Vault, AWS, GCP, and others into native Kubernetes Secrets.",
    updated: "2026",
    prerequisites: ["A Kubernetes cluster, kubectl, and Helm 3", "An external secret store (Vault, AWS Secrets Manager, etc.)"],
    sections: [
      {
        heading: "Install with Helm",
        code: [
          {
            code: `helm repo add external-secrets https://charts.external-secrets.io
helm repo update
helm install external-secrets external-secrets/external-secrets \\
  -n external-secrets --create-namespace`,
          },
        ],
      },
      {
        heading: "Verify",
        code: [{ code: `kubectl get pods -n external-secrets` }],
        note: "Next, create a SecretStore (pointing at your backend) and an ExternalSecret that maps remote keys into a Kubernetes Secret.",
      },
    ],
    docs: { label: "External Secrets Documentation", url: "https://external-secrets.io/latest/" },
    kb: { label: "External Secrets GitHub Discussions", url: "https://github.com/external-secrets/external-secrets/discussions" },
    related: ["openbao", "vault", "sops"],
  },

  // ===================================================================
  // Service Mesh & Networking
  // ===================================================================
  {
    slug: "istio",
    toolName: "Istio",
    categorySlug: "service-mesh-networking",
    toolSlug: "istio",
    headline: "How to Install & Set Up Istio",
    summary:
      "Install Istio with istioctl to add a full-featured service mesh — traffic management and mTLS — to your Kubernetes cluster.",
    updated: "2026",
    prerequisites: ["A Kubernetes cluster (v1.28+) and kubectl configured"],
    sections: [
      {
        heading: "Download Istio and istioctl",
        code: [
          {
            code: `curl -L https://istio.io/downloadIstio | sh -
cd istio-*
export PATH=$PWD/bin:$PATH`,
          },
        ],
      },
      {
        heading: "Install the mesh and enable sidecar injection",
        code: [
          {
            code: `istioctl install --set profile=demo -y
kubectl label namespace default istio-injection=enabled`,
          },
        ],
      },
      {
        heading: "Verify",
        code: [
          {
            code: `istioctl verify-install
kubectl get pods -n istio-system`,
          },
        ],
      },
    ],
    docs: { label: "Istio Documentation", url: "https://istio.io/latest/docs/" },
    kb: { label: "Istio Community Forum", url: "https://discuss.istio.io/" },
    related: ["linkerd", "envoy", "kubernetes"],
  },
  {
    slug: "linkerd",
    toolName: "Linkerd",
    categorySlug: "service-mesh-networking",
    toolSlug: "linkerd",
    headline: "How to Install & Set Up Linkerd",
    summary:
      "Install Linkerd — a lightweight, ultra-low-overhead service mesh for Kubernetes — with the CLI and a two-step apply.",
    updated: "2026",
    prerequisites: ["A Kubernetes cluster and kubectl configured"],
    sections: [
      {
        heading: "Install the Linkerd CLI",
        code: [
          {
            code: `curl --proto '=https' --tlsv1.2 -sSfL https://run.linkerd.io/install | sh
export PATH=$HOME/.linkerd2/bin:$PATH
linkerd version`,
          },
        ],
      },
      {
        heading: "Validate and install into the cluster",
        code: [
          {
            code: `linkerd check --pre
linkerd install --crds | kubectl apply -f -
linkerd install | kubectl apply -f -`,
          },
        ],
      },
      {
        heading: "Verify",
        code: [{ code: `linkerd check` }],
      },
    ],
    docs: { label: "Linkerd Documentation", url: "https://linkerd.io/2/overview/" },
    kb: { label: "Linkerd Community", url: "https://linkerd.io/community/" },
    related: ["istio", "envoy", "kubernetes"],
  },
  {
    slug: "envoy",
    toolName: "Envoy",
    categorySlug: "service-mesh-networking",
    toolSlug: "envoy",
    headline: "How to Install & Set Up Envoy",
    summary:
      "Install the Envoy proxy — the high-performance edge/service proxy behind most service meshes — with func-e or Docker.",
    updated: "2026",
    prerequisites: ["A Linux host, or Docker", "An envoy.yaml bootstrap configuration"],
    sections: [
      {
        heading: "Option A — Install with func-e",
        code: [
          {
            code: `curl https://func-e.io/install.sh | sudo bash -s -- -b /usr/local/bin
func-e use 1.31.0
func-e run -c envoy.yaml`,
          },
        ],
      },
      {
        heading: "Option B — Run with Docker",
        code: [
          {
            code: `docker run --rm -it \\
  -p 9901:9901 -p 10000:10000 \\
  -v $(pwd)/envoy.yaml:/etc/envoy/envoy.yaml \\
  envoyproxy/envoy:v1.31-latest`,
          },
        ],
      },
      {
        heading: "Verify",
        paragraphs: ["The admin interface is on port 9901:"],
        code: [{ code: `curl http://localhost:9901/ready` }],
      },
    ],
    docs: { label: "Envoy Documentation", url: "https://www.envoyproxy.io/docs" },
    kb: { label: "Envoy GitHub Discussions", url: "https://github.com/envoyproxy/envoy/discussions" },
    related: ["istio", "traefik", "haproxy"],
  },
  {
    slug: "traefik",
    toolName: "Traefik",
    categorySlug: "service-mesh-networking",
    toolSlug: "traefik",
    headline: "How to Install & Set Up Traefik",
    summary:
      "Run Traefik — a cloud-native reverse proxy and load balancer with automatic service discovery and Let's Encrypt HTTPS.",
    updated: "2026",
    prerequisites: ["A host with Docker (for the container method), or a Linux binary target"],
    sections: [
      {
        heading: "Option A — Run with Docker",
        code: [
          {
            code: `docker run -d --name traefik \\
  -p 80:80 -p 8080:8080 \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  traefik:v3.1 --api.insecure=true --providers.docker`,
          },
        ],
        note: "The Docker provider auto-discovers other containers by their labels. Disable --api.insecure in production.",
      },
      {
        heading: "Option B — Binary",
        code: [
          {
            code: `curl -L https://github.com/traefik/traefik/releases/download/v3.1.0/traefik_v3.1.0_linux_amd64.tar.gz -o traefik.tar.gz
tar xzf traefik.tar.gz
./traefik --api.insecure=true --providers.docker`,
          },
        ],
      },
      {
        heading: "Verify",
        paragraphs: ["Open http://localhost:8080 for the Traefik dashboard showing routers, services, and middlewares."],
      },
    ],
    docs: { label: "Traefik Documentation", url: "https://doc.traefik.io/traefik/" },
    kb: { label: "Traefik Community Forum", url: "https://community.traefik.io/" },
    related: ["haproxy", "caddy", "envoy"],
  },
  {
    slug: "haproxy",
    toolName: "HAProxy",
    categorySlug: "service-mesh-networking",
    toolSlug: "haproxy",
    headline: "How to Install & Set Up HAProxy",
    summary:
      "Install HAProxy — the battle-tested TCP/HTTP load balancer — from the maintained PPA and wire up your first backend.",
    updated: "2026",
    prerequisites: ["An Ubuntu/Debian host with sudo access", "Backend servers to load-balance"],
    sections: [
      {
        heading: "Install HAProxy",
        code: [
          {
            code: `sudo add-apt-repository ppa:vbernat/haproxy-3.0
sudo apt update
sudo apt install -y haproxy`,
          },
        ],
      },
      {
        heading: "Configure a simple HTTP frontend/backend",
        code: [
          {
            label: "/etc/haproxy/haproxy.cfg (append)",
            code: `frontend http_in
    bind *:80
    default_backend web_servers

backend web_servers
    balance roundrobin
    server web1 192.0.2.10:8080 check
    server web2 192.0.2.11:8080 check`,
          },
        ],
      },
      {
        heading: "Validate config and restart",
        code: [
          {
            code: `haproxy -c -f /etc/haproxy/haproxy.cfg
sudo systemctl restart haproxy`,
          },
        ],
      },
    ],
    docs: { label: "HAProxy Documentation", url: "https://docs.haproxy.org/" },
    kb: { label: "HAProxy Community", url: "https://discourse.haproxy.org/" },
    related: ["traefik", "caddy", "envoy"],
  },
  {
    slug: "caddy",
    toolName: "Caddy",
    categorySlug: "service-mesh-networking",
    toolSlug: "caddy",
    headline: "How to Install & Set Up Caddy",
    summary:
      "Install Caddy — the web server with automatic HTTPS by default — from the official APT repository and serve a site in one line.",
    updated: "2026",
    prerequisites: ["An Ubuntu/Debian host", "A domain pointed at the server for automatic TLS (optional for local testing)"],
    sections: [
      {
        heading: "Install Caddy (APT repo)",
        code: [
          {
            code: `sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install -y caddy`,
          },
        ],
      },
      {
        heading: "Serve a site",
        code: [
          {
            code: `# instant static file server:
caddy file-server --listen :8080

# or a reverse proxy with automatic HTTPS:
caddy reverse-proxy --from example.com --to localhost:9000`,
          },
        ],
      },
      {
        heading: "Verify",
        code: [
          {
            code: `caddy version
sudo systemctl status caddy`,
          },
        ],
      },
    ],
    docs: { label: "Caddy Documentation", url: "https://caddyserver.com/docs/" },
    kb: { label: "Caddy Community Forum", url: "https://caddy.community/" },
    related: ["traefik", "haproxy", "envoy"],
  },

  // ===================================================================
  // Load Testing
  // ===================================================================
  {
    slug: "k6",
    toolName: "k6",
    categorySlug: "load-testing",
    toolSlug: "k6",
    headline: "How to Install & Set Up k6",
    summary:
      "Install Grafana k6 — developer-centric load testing scripted in JavaScript — and run your first performance test.",
    updated: "2026",
    prerequisites: ["A Linux/macOS/Windows host"],
    sections: [
      {
        heading: "Install k6",
        code: [
          { label: "Ubuntu / Debian", code: `sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6` },
          { label: "macOS (Homebrew)", code: `brew install k6` },
        ],
      },
      {
        heading: "Write and run your first test",
        code: [
          {
            label: "script.js",
            code: `import http from 'k6/http';
import { sleep } from 'k6';

export const options = { vus: 10, duration: '30s' };

export default function () {
  http.get('https://test.k6.io');
  sleep(1);
}`,
          },
          { label: "run it", code: `k6 run script.js` },
        ],
      },
    ],
    docs: { label: "k6 Documentation", url: "https://grafana.com/docs/k6/latest/" },
    kb: { label: "Grafana k6 Community", url: "https://community.grafana.com/c/grafana-k6/" },
    related: ["jmeter", "locust", "grafana"],
  },
  {
    slug: "jmeter",
    toolName: "Apache JMeter",
    categorySlug: "load-testing",
    toolSlug: "jmeter",
    headline: "How to Install & Set Up Apache JMeter",
    summary:
      "Install Apache JMeter — the long-standing GUI-driven load and functional testing tool — and run a test plan from the command line.",
    updated: "2026",
    prerequisites: ["Java 8+ (JRE or JDK) installed"],
    sections: [
      {
        heading: "Install Java and download JMeter",
        code: [
          {
            code: `sudo apt install -y default-jdk
curl -LO https://dlcdn.apache.org/jmeter/binaries/apache-jmeter-5.6.3.tgz
tar xzf apache-jmeter-5.6.3.tgz
cd apache-jmeter-5.6.3`,
          },
        ],
      },
      {
        heading: "Launch the GUI (to build a test plan)",
        code: [{ code: `./bin/jmeter` }],
        note: "Build and debug test plans in the GUI, but always run real load tests in non-GUI mode — the GUI itself consumes significant resources.",
      },
      {
        heading: "Run a test plan (non-GUI) and verify",
        code: [
          {
            code: `./bin/jmeter --version
./bin/jmeter -n -t test-plan.jmx -l results.jtl -e -o ./report`,
          },
        ],
      },
    ],
    docs: { label: "JMeter User Manual", url: "https://jmeter.apache.org/usermanual/index.html" },
    kb: { label: "JMeter on Stack Overflow", url: "https://stackoverflow.com/questions/tagged/jmeter" },
    related: ["k6", "locust"],
  },
  {
    slug: "locust",
    toolName: "Locust",
    categorySlug: "load-testing",
    toolSlug: "locust",
    headline: "How to Install & Set Up Locust",
    summary:
      "Install Locust to write distributed load tests in Python and drive them from a real-time web UI.",
    updated: "2026",
    prerequisites: ["Python 3.9+ and pip"],
    sections: [
      {
        heading: "Install Locust",
        code: [
          {
            code: `pip install locust
locust --version`,
          },
        ],
      },
      {
        heading: "Write a locustfile",
        code: [
          {
            label: "locustfile.py",
            code: `from locust import HttpUser, task, between

class QuickUser(HttpUser):
    wait_time = between(1, 3)

    @task
    def index(self):
        self.client.get("/")`,
          },
        ],
      },
      {
        heading: "Run and open the UI",
        code: [{ code: `locust -f locustfile.py --host https://example.com` }],
        paragraphs: ["Open http://localhost:8089, set the number of users and spawn rate, and start the swarm."],
      },
    ],
    docs: { label: "Locust Documentation", url: "https://docs.locust.io/" },
    kb: { label: "Locust GitHub Discussions", url: "https://github.com/locustio/locust/discussions" },
    related: ["k6", "jmeter"],
  },

  // ===================================================================
  // Self-Hosted Git
  // ===================================================================
  {
    slug: "gitlab-ce",
    toolName: "GitLab CE",
    categorySlug: "self-hosted-git",
    toolSlug: "gitlab-ce",
    headline: "How to Install & Set Up GitLab CE",
    summary:
      "Install the self-hosted GitLab Community Edition — repos, CI/CD, issues, and a container registry — with the Omnibus package.",
    updated: "2026",
    featured: true,
    prerequisites: [
      "A dedicated host with 4 GB+ RAM (8 GB recommended) and 2+ vCPUs",
      "A domain name for the EXTERNAL_URL",
      "Ubuntu 22.04 / Debian 12 or a supported RHEL-family OS",
    ],
    sections: [
      {
        heading: "Install dependencies and add the repo",
        code: [
          {
            code: `sudo apt-get update
sudo apt-get install -y curl openssh-server ca-certificates tzdata perl
curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.deb.sh | sudo bash`,
          },
        ],
      },
      {
        heading: "Install GitLab with your external URL",
        code: [
          {
            code: `sudo EXTERNAL_URL="https://gitlab.example.com" apt-get install -y gitlab-ce`,
          },
        ],
        note: "With an https:// EXTERNAL_URL on a public domain, GitLab automatically requests a Let's Encrypt certificate.",
      },
      {
        heading: "Alternative — run GitLab in Docker",
        code: [
          {
            code: `docker run -d --name gitlab \\
  --hostname gitlab.example.com \\
  -p 80:80 -p 443:443 -p 22:22 \\
  -v /srv/gitlab/config:/etc/gitlab \\
  -v /srv/gitlab/logs:/var/log/gitlab \\
  -v /srv/gitlab/data:/var/opt/gitlab \\
  gitlab/gitlab-ce:latest`,
          },
        ],
      },
      {
        heading: "Log in with the initial root password",
        code: [{ code: `sudo cat /etc/gitlab/initial_root_password` }],
        paragraphs: ["Browse to your EXTERNAL_URL and sign in as root with that password (it is auto-deleted after 24 hours)."],
      },
    ],
    docs: { label: "GitLab Documentation", url: "https://docs.gitlab.com/" },
    kb: { label: "GitLab Community Forum", url: "https://forum.gitlab.com/" },
    related: ["gitea", "forgejo", "jenkins"],
  },
  {
    slug: "gitea",
    toolName: "Gitea",
    categorySlug: "self-hosted-git",
    toolSlug: "gitea",
    headline: "How to Install & Set Up Gitea",
    summary:
      "Install Gitea — a lightweight, fast, single-binary self-hosted Git service — from the binary or with Docker.",
    updated: "2026",
    prerequisites: ["A Linux host (very modest resources — 512 MB RAM is enough for small teams)"],
    sections: [
      {
        heading: "Option A — Single binary",
        code: [
          {
            code: `wget -O gitea https://dl.gitea.com/gitea/1.22/gitea-1.22-linux-amd64
chmod +x gitea
sudo useradd --system --create-home --home-dir /home/git --shell /bin/bash git
sudo mv gitea /usr/local/bin/gitea
gitea web`,
          },
        ],
      },
      {
        heading: "Option B — Docker",
        code: [
          {
            code: `docker run -d --name gitea \\
  -p 3000:3000 -p 222:22 \\
  -v gitea:/data \\
  gitea/gitea:latest`,
          },
        ],
      },
      {
        heading: "Verify and finish setup",
        paragraphs: ["Open http://your-host:3000 and complete the web installer (database, admin account, and site settings)."],
      },
    ],
    docs: { label: "Gitea Documentation", url: "https://docs.gitea.com/" },
    kb: { label: "Gitea Community Forum", url: "https://forum.gitea.com/" },
    related: ["forgejo", "gitlab-ce", "gitea-actions"],
  },
  {
    slug: "forgejo",
    toolName: "Forgejo",
    categorySlug: "self-hosted-git",
    toolSlug: "forgejo",
    headline: "How to Install & Set Up Forgejo",
    summary:
      "Install Forgejo — the community-driven, fully open source fork of Gitea — as a single binary or a Docker container.",
    updated: "2026",
    prerequisites: ["A Linux host with modest resources"],
    sections: [
      {
        heading: "Option A — Single binary",
        code: [
          {
            code: `wget -O forgejo https://codeberg.org/forgejo/forgejo/releases/download/v8.0.0/forgejo-8.0.0-linux-amd64
chmod +x forgejo
sudo mv forgejo /usr/local/bin/forgejo
forgejo web`,
          },
        ],
      },
      {
        heading: "Option B — Docker",
        code: [
          {
            code: `docker run -d --name forgejo \\
  -p 3000:3000 -p 222:22 \\
  -v forgejo:/data \\
  codeberg.org/forgejo/forgejo:8`,
          },
        ],
      },
      {
        heading: "Verify and finish setup",
        paragraphs: ["Open http://your-host:3000 and complete the initial configuration and admin account creation."],
      },
    ],
    docs: { label: "Forgejo Documentation", url: "https://forgejo.org/docs/latest/" },
    kb: { label: "Forgejo Discussions", url: "https://codeberg.org/forgejo/discussions" },
    related: ["gitea", "gitlab-ce", "gitea-actions"],
  },

  // GUIDES-END (append new guides above this line)
];

const catalogOrder = new Map(devopsCatalog.map((c, i) => [c.slug, i]));

export function findGuide(slug: string): InstallGuide | undefined {
  return installGuides.find((g) => g.slug === slug);
}

/** Every guide slug — used for on-demand (ISR) rendering. */
export function allGuideParams(): { slug: string }[] {
  return installGuides.map((g) => ({ slug: g.slug }));
}

/** Featured (high-traffic) guides, prerendered at build time. */
export function featuredGuideParams(): { slug: string }[] {
  return installGuides.filter((g) => g.featured).map((g) => ({ slug: g.slug }));
}

/** Human-readable category name for a category slug. */
export function categoryName(slug: string): string {
  return devopsCatalog.find((c) => c.slug === slug)?.category ?? "Guides";
}

/** Guides grouped by catalog category, in catalog order. */
export function guidesByCategory(): { category: string; slug: string; guides: InstallGuide[] }[] {
  return devopsCatalog
    .map((c) => ({
      category: c.category,
      slug: c.slug,
      guides: installGuides.filter((g) => g.categorySlug === c.slug),
    }))
    .filter((group) => group.guides.length > 0)
    .sort((a, b) => (catalogOrder.get(a.slug) ?? 0) - (catalogOrder.get(b.slug) ?? 0));
}

export function relatedGuides(guide: InstallGuide): InstallGuide[] {
  return (guide.related ?? [])
    .map((slug) => findGuide(slug))
    .filter((g): g is InstallGuide => Boolean(g));
}

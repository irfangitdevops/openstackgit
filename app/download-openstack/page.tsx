import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CopyButton from "@/components/download/CopyButton";

export const metadata: Metadata = {
  title: "Download & Install OpenStack — DevStack, Kolla-Ansible, RDO & More — OpenStack Dev",
  description:
    "Every official way to install OpenStack: DevStack for dev/test, Kolla-Ansible and OpenStack-Ansible for production, Canonical's Sunbeam snap, RDO/Packstack for RHEL, and Ubuntu Cloud Archive.",
  keywords: [
    "download openstack",
    "install openstack",
    "devstack",
    "kolla-ansible",
    "openstack-ansible",
    "rdo openstack",
    "packstack",
    "ubuntu cloud archive",
  ],
  openGraph: {
    title: "Download & Install OpenStack",
    description: "Every official OpenStack install path — dev/test and production — in one place.",
    url: "https://openstackgit.com/download-openstack",
    siteName: "OpenStack Dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download & Install OpenStack",
    description: "DevStack, Kolla-Ansible, OpenStack-Ansible, RDO, and Ubuntu Cloud Archive.",
  },
  alternates: {
    canonical: "https://openstackgit.com/download-openstack",
  },
};

type Method = {
  id: string;
  title: string;
  tag: string;
  tagColor: string;
  desc: string;
  commands: string[];
  docsUrl: string;
};

const methods: Method[] = [
  {
    id: "devstack",
    title: "DevStack",
    tag: "Dev / Test",
    tagColor: "var(--primary)",
    desc: "The official quick-install script for a single-node OpenStack environment. Standard for development, CI, and trying OpenStack for the first time — not for production.",
    commands: [
      "git clone https://opendev.org/openstack/devstack",
      "cd devstack",
      "./stack.sh",
    ],
    docsUrl: "https://docs.openstack.org/devstack/latest/",
  },
  {
    id: "kolla-ansible",
    title: "Kolla-Ansible",
    tag: "Production",
    tagColor: "#0F766E",
    desc: "Deploys OpenStack as production-ready Docker containers using Ansible playbooks. The most common way to run OpenStack in production today.",
    commands: [
      "pip install kolla-ansible",
      "kolla-ansible install-deps",
      "kolla-genpwd",
      "kolla-ansible bootstrap-servers -i multinode",
      "kolla-ansible deploy -i multinode",
    ],
    docsUrl: "https://docs.openstack.org/kolla-ansible/latest/",
  },
  {
    id: "openstack-ansible",
    title: "OpenStack-Ansible",
    tag: "Production",
    tagColor: "#0F766E",
    desc: "Deploys OpenStack directly onto hosts (LXC containers, not Docker) using Ansible — an alternative production deployment path maintained by the OpenStack project itself.",
    commands: [
      "git clone https://opendev.org/openstack/openstack-ansible /opt/openstack-ansible",
      "cd /opt/openstack-ansible",
      "./scripts/bootstrap-ansible.sh",
    ],
    docsUrl: "https://docs.openstack.org/openstack-ansible/latest/",
  },
  {
    id: "sunbeam",
    title: "Canonical OpenStack (Sunbeam)",
    tag: "Quick Start",
    tagColor: "#7C3AED",
    desc: "Canonical's snap-based OpenStack — the successor to MicroStack. Single-command bring-up on Ubuntu, backed by MicroK8s underneath.",
    commands: [
      "sudo snap install openstack --channel 2024.1/stable",
      "sunbeam prepare-node-script | bash -x",
      "sunbeam cluster bootstrap",
    ],
    docsUrl: "https://docs.openstack.org/sunbeam/latest/",
  },
  {
    id: "rdo",
    title: "RDO / Packstack (RHEL, CentOS, Fedora)",
    tag: "Production",
    tagColor: "#0F766E",
    desc: "RDO packages OpenStack for the RHEL/CentOS/Fedora ecosystem. Packstack gives a quick all-in-one or multi-node install on top of those packages.",
    commands: [
      "sudo dnf install -y centos-release-openstack-caracal",
      "sudo dnf install -y openstack-packstack",
      "packstack --allinone",
    ],
    docsUrl: "https://www.rdoproject.org/install/",
  },
  {
    id: "uca",
    title: "Ubuntu Cloud Archive",
    tag: "Packages",
    tagColor: "#374151",
    desc: "Canonical's rolling package archive that backports the latest OpenStack releases onto Ubuntu LTS — install individual OpenStack services with apt.",
    commands: [
      "sudo add-apt-repository cloud-archive:caracal",
      "sudo apt update",
      "sudo apt install nova-compute",
    ],
    docsUrl: "https://ubuntu.com/openstack/install",
  },
];

export default function DownloadOpenStackPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section
          style={{
            padding: "140px 0 60px",
            background: "linear-gradient(135deg, #FFF5F0 0%, #FFFFFF 40%, #FFF0F0 100%)",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
            <span className="section-tag">Free &amp; Official</span>
            <h1
              style={{
                fontSize: "clamp(30px, 5vw, 48px)",
                fontWeight: 800,
                lineHeight: 1.15,
                color: "var(--text)",
                margin: "16px 0 20px",
              }}
            >
              Download &amp; Install <span className="text-gradient">OpenStack</span>
            </h1>
            <p style={{ fontSize: 17, color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 620, margin: "0 auto" }}>
              OpenStack isn&apos;t a single installer — it&apos;s a set of services you deploy with a
              tool. Here are every official path, from a single-node dev sandbox to a
              multi-node production cloud.
            </p>
          </div>
        </section>

        {/* Methods */}
        <section style={{ padding: "60px 0", background: "var(--bg)" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px", display: "flex", flexDirection: "column", gap: 20 }}>
            {methods.map((m) => (
              <div
                key={m.id}
                id={m.id}
                style={{
                  background: "var(--bg-alt)",
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius-lg)",
                  padding: "28px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
                  <h2 style={{ fontSize: 19, fontWeight: 700, color: "var(--text)", margin: 0 }}>{m.title}</h2>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#fff",
                      background: m.tagColor,
                      padding: "3px 10px",
                      borderRadius: 100,
                      textTransform: "uppercase",
                      letterSpacing: "0.4px",
                    }}
                  >
                    {m.tag}
                  </span>
                </div>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 18, maxWidth: 640 }}>
                  {m.desc}
                </p>
                <div
                  style={{
                    background: "var(--bg-dark)",
                    borderRadius: 8,
                    padding: "14px 16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  {m.commands.map((cmd, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                      <code style={{ fontSize: 13, color: "#e8e8f0", fontFamily: "monospace", overflowX: "auto", whiteSpace: "nowrap" }}>
                        $ {cmd}
                      </code>
                      {i === 0 && <CopyButton text={m.commands.join("\n")} />}
                    </div>
                  ))}
                </div>
                <a
                  href={m.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-block", marginTop: 14, fontSize: 13, color: "var(--text-secondary)", textDecoration: "underline" }}
                >
                  Official {m.title} docs →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "80px 0", background: "var(--bg-dark)", textAlign: "center" }}>
          <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px" }}>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "#fff", marginBottom: 12 }}>
              Need OpenStack deployed and managed for you?
            </h2>
            <p style={{ fontSize: 15, color: "#9CA3AF", lineHeight: 1.7, marginBottom: 28 }}>
              We&apos;re OpenStack Dev — DevOps and infrastructure is literally in our name.
              We design, deploy, and operate production OpenStack clouds.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "var(--primary)",
                  color: "#fff",
                  padding: "12px 28px",
                  borderRadius: "var(--radius)",
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                Get in Touch
              </Link>
              <Link
                href="/downloads"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "transparent",
                  color: "#fff",
                  padding: "12px 28px",
                  borderRadius: "var(--radius)",
                  fontSize: 15,
                  fontWeight: 600,
                  border: "2px solid rgba(255,255,255,0.2)",
                }}
              >
                Browse All DevOps Tools
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
